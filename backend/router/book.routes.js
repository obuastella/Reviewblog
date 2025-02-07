import express from "express";
import Book from "../models/book.model.js";

const router = express.Router();

// ✅ Get all books (including review count)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ✅ Get a single book with reviews
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// ✅ Add a new book
router.post("/", async (req, res) => {
  try {
    const { title, image } = req.body;
    const newBook = new Book({ title, image });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ✅ Add a review to a book
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, review } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    // Push new review into the reviews array
    book.reviews.push({ user, review });
    await book.save();

    res.status(201).json({ message: "Review added successfully", book });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Failed to add review" });
  }
});

// ✅ Update a review in a book
router.put("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const review = book.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    review.review = req.body.review; // Update review text
    await book.save();

    res.status(200).json({ message: "Review updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

// ✅ Delete a review from a book
router.delete("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.reviews = book.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId
    );
    await book.save();

    res.status(200).json({ message: "Review deleted successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router;
