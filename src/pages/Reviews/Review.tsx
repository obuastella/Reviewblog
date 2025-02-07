//@ts-nocheck
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockReviews = {
  1: [
    { user: "Alice", review: "Great book!" },
    { user: "Bob", review: "Loved the story" },
    { user: "Charlie", review: "Highly recommended" },
  ],
  2: [
    { user: "Dave", review: "Very touching" },
    { user: "Eve", review: "A classic masterpiece" },
  ],
  3: [
    { user: "Frank", review: "Deep and thought-provoking" },
    { user: "Grace", review: "Scary but realistic" },
  ],
};

export default function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<{ user: string; review: string }[]>(
    []
  );
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    setReviews(mockReviews[id] || []);
  }, [id]);

  const handleSubmitReview = () => {
    if (newReview.trim() === "") return;
    setReviews([...reviews, { user: "You", review: newReview }]);
    setNewReview("");
  };

  return (
    <div className="p-4 w-full h-screen bg-primary/95 flex flex-col">
      {/* Header */}
      <section className="m-auto my-6 w-full max-w-2xl">
        <Link
          className="text-white flex items-center text-lg gap-x-3"
          to="/discover"
        >
          <ArrowLeft size={20} />
          Go back
        </Link>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Reviews for Book {id}</h1>

          {/* Book Image */}
          <img
            src="/images/darkside.jpeg"
            alt="Book Cover"
            className="w-full h-60 object-cover rounded-md mb-4 shadow-lg"
          />

          {/* Reviews Section */}
          <div className="bg-white p-4 rounded-lg shadow-md h-80 overflow-y-auto space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border-b last:border-none"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                    {review.user.charAt(0)}
                  </div>
                  {/* Review Content */}
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No reviews yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Input Section (Sticky at the bottom) */}
      <div className="bg-white p-4 flex items-center gap-2 shadow-lg border-t w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Write your review..."
          className="flex-1 p-2 border rounded-lg outline-none"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <Button
          onClick={handleSubmitReview}
          disabled={!newReview.trim()}
          className="flex items-center gap-1"
        >
          Send <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
