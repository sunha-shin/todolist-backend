import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './route/todo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.5tskqio.mongodb.net/`)
.then((result) => console.log("Successfully connected DB"))
.catch((err) => console.log(err));

const app = express();

// body로 데이터 보낼때 아래 두줄필요 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

// 가장 마지막에서 listen!
app.listen(8080, () => {
    console.log(`Connected 8080`);
})
