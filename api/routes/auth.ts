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
router.post('/register', async (req: Request, res: Response) => {

    // Extract username and password from the request body.
    const { full_name, email, password, confirm_password, phone_number } = req.body;

    if (!full_name || !email || !password || !confirm_password || !phone_number) {
        console.log("Missing: ", req.body);
        return res.status(400).json({ error: 'Please fill in all fields!' });
    }

    if (password !== confirm_password) {
        console.log("Password and confirm password do not match.");
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    try {
        const { rows } = await pool.query(
            'INSERT INTO users (full_name, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, full_name, email, password',
            [full_name, phone_number, email, hashedPassword]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Query failed!' });
    }


});

export default router;