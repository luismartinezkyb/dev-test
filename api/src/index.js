//imports
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import express from 'express';
import usersRoutes from './routes/users.js';
import {createConnection} from './database/database.js';
import cookieParser from 'cookie-parser';

//initializations
createConnection();
const app = express();

//Settings

const port = process.env.APP_PORT || 3001;

//middlewares
app.use(cors({
	origin:'*',
	method: '*',
	credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
// app.use(cors({
// 	origin:['http://localhost;3000'],
// 	method: ['GET', 'POST'],
// 	credentials: true,
// })); //i need credentials to log into the server

//routes
app.use('/api',usersRoutes);

//global variables

//listen

app.listen(port, (err, res) => console.log(`the app is listening on http://localhost:${port}`));