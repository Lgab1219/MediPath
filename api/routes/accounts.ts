import express, { type Express, type Request, type Response } from 'express';
import { pool } from '../src/db';

const router = express.Router();

// Query data to Supabase using the connection pool
router.post('/', async (req: Request, res: Response) => {

    // Extract username and password from the request body.
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields!' });
    }

    try {
        const { rows } = await pool.query(
            'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING user_id, full_name, email, password',
            [full_name, email, password]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Query failed!' });
    }


});

export default router;