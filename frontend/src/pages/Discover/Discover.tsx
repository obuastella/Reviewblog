//@ts-nocheck
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/store/authStore";

export default function Discover() {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`);
        console.log(response.data);
        setBooks(response.data);
      } catch (error: any) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const openReviewModal = (book: any) => {
    console.log(book._id);
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const submitReview = async () => {
    if (!selectedBook) {
      console.error("No book selected.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/books/${selectedBook._id}/reviews`,
        { review: review }
      );
      if (response.status === 201) {
        setBooks((prevBooks: any) =>
          prevBooks.map((book: any) =>
            book._id === selectedBook._id
              ? { ...book, reviews: [...book.reviews, response.data] }
              : book
          )
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-4">Most Popular books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <div
            key={book._id}
            className="p-4 bg-gray-100 rounded-lg shadow-md relative"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 object-cover rounded-md mb-2"
            />
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{book.title}</span>
              <Button variant="ghost" onClick={() => openReviewModal(book)}>
                {/* <MoreVertical size={20} /> */}
                <Pencil size={20} />
              </Button>
            </div>
            <p
              className="text-sm text-blue-600 mt-1 cursor-pointer"
              onClick={() => navigate(`/reviews/${book._id}`)}
            >
              {book.reviews.length} reviews
            </p>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review for {selectedBook?.title}</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Write your review here..."
            onChange={(e: any) => setReview(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview} disabled={!review.trim()}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
