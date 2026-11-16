import express, { type Express, type Request, type Response } from 'express';
import { pool } from '../src/db';
import bcrypt from 'bcrypt';

// NOTE: Need to fix the login bug: Logging in even though password is incorrect. 
// The issue is that the response is sent before the password comparison is done. 
// The response should only be sent after the password comparison is done and the account is verified to be valid.

const router = express.Router();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    
    if (!password) {
        throw new Error('Password is required for hashing.');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
}

// Password comparison function for login authentication
async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {

    if (!password) {
        throw new Error('Password is required for comparison.');
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) return false;

    return true;
}

// Query data to Supabase using the connection pool
router.post('/register', async (req: Request, res: Response) => {

    // Extract username and password from the request body.
    const { full_name, email, password, confirm_password, phone_number } = req.body;

    if (!full_name || !email || !password || !confirm_password || !phone_number) {
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
        // console.error(error);
        res.status(500).json({ error: 'Query failed!' });
    }


});

router.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields!' });
    }

    try {
        const { rows } = await pool.query(
            'SELECT full_name, password FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        res.status(201).json(rows[0]);

        const validAccount = await comparePassword(password, rows[0].password);

        if (!validAccount) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        res.status(200).json({ full_name: rows[0].full_name || null, message: 'Login successful!' });

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Query failed!' });
    }

});

export default router;