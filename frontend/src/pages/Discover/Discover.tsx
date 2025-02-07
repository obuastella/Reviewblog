//@ts-nocheck
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    image: "/images/a-crime.jpeg",
    reviews: 10,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    image: "/images/darkside.jpeg",
    reviews: 8,
  },
  { id: 3, title: "1984", image: "/images/smoke-thieves.jpeg", reviews: 15 },
  {
    id: 4,
    title: "Pride and Prejudice",
    image: "/images/pride.jpg",
    reviews: 12,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    image: "/images/catcher.jpg",
    reviews: 7,
  },
  { id: 6, title: "Moby-Dick", image: "/images/mobydick.jpg", reviews: 5 },
  { id: 7, title: "The Hobbit", image: "/images/hobbit.jpg", reviews: 20 },
  { id: 8, title: "War and Peace", image: "/images/warpeace.jpg", reviews: 9 },
  { id: 9, title: "The Odyssey", image: "/images/odyssey.jpg", reviews: 6 },
  {
    id: 10,
    title: "Crime and Punishment",
    image: "/images/crime.jpg",
    reviews: 14,
  },
];

export default function Discover() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openReviewModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const submitReview = () => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === selectedBook.id
          ? { ...book, reviews: book.reviews + 1 }
          : book
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-4">Most Popular books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
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
              onClick={() => navigate(`/reviews/${book.id}`)}
            >
              {book.reviews} reviews
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
          ></textarea>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
