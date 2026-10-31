import express, { type Express, type Request, type Response } from 'express';
import accountsRouter from '../routes/accounts';

const app: Express = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Use /accuonts route for account-related operations (login/register)
app.use('/accounts', accountsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});