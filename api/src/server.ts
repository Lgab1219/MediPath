import express, { type Express, type Request, type Response } from 'express';
import authRouter from '../routes/auth';

const app: Express = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Use /auth route for authentication-related operations (login/register)
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});