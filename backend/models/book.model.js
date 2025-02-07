import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const BookSchema = new mongoose.Schema({
  title: String,
  reviews: [
    {
      user: String,
      review: String,
    },
  ],
});

export default mongoose.model("Book", BookSchema);
