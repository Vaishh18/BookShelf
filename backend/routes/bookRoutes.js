import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// POST: Create a new book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear || !req.body.genre || !req.body.description) {
      return res.status(400).send({ message: "Fill all the required fields" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
      description: req.body.description,
      rating: req.body.rating || 0,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET: Fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// GET book by customId
router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ customId: Number(id) }); // << use customId

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});





// PUT: Update a book by ID
router.put('/id/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear || !req.body.genre || !req.body.description) {
      return res.status(400).send({ message: "All fields required" });
    }

    const { id } = req.params;
    const result = await Book.findOneAndUpdate(
      { customId: Number(id) },  // ✅ Use customId instead of _id
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});


// DELETE: Delete a book by ID
router.delete('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findOneAndDelete({ customId: Number(id) }); // ✅ Use customId

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});


export default router;
  