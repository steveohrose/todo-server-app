import { config } from 'dotenv';
import express from 'express';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Mum look I can hack!!!');
});

app.post('/name', (req, res) => {
  if (req.body.name) {
    return res.json({ name: req.body.name });
  } else {
    return res.status(400).json({ error: 'No name provided' });
  }
});

console.log('process.env.PORT', process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
