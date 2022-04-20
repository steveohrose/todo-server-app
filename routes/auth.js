import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// @ route   GET /api/auth/test
// @ desc    Test the auth route
// @ access  Public
router.get('/test', (req, res) => {
  res.send('Auth is working');
});

// @ route   POST /api/auth/register
// @ desc    Create a new user
// @ access  Public
router.post('/register', async (req, res) => {
  try {
    // hash user password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    // save user to the database
    const savedUser = await newUser.save();

    // return new users
    return res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

export default router;
