import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('Mum look I can hack!!!');
});

app.use('/api/auth', authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database...');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
