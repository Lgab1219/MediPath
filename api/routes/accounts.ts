import express, { type Express, type Request, type Response } from 'express';
import { pool } from '../src/db';
import bcrypt from 'bcrypt';

const router = express.Router();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    
    if (!password) {
        throw new Error('Password is required for hashing.');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
}

// Query data to Supabase using the connection pool
router.post('/', async (req: Request, res: Response) => {

    // Extract username and password from the request body.
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields!' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    try {
        const { rows } = await pool.query(
            'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING user_id, full_name, email, password',
            [full_name, email, hashedPassword]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Query failed!' });
    }


});

export default router;