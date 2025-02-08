import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [
    {
      user: String,
      review: String,
    },
  ],
});

export default mongoose.model("Book", BookSchema);
