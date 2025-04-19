import dotenv from 'dotenv';
dotenv.config(); // Load .env variables at the very beginning

import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// CORS setup
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Routes
app.use('/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Book API!');
});

// Server listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
