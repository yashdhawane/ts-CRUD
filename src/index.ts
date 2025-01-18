import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './DB/Db';
import UserRouter from './Routes/userRoute';
import TaskRouter from './Routes/taskRoute';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', UserRouter);
app.use('/api/tasks', TaskRouter);

const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    console.log("connected DB");
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
});

