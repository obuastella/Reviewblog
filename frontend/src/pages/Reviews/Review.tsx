//@ts-nocheck
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/store/authStore";
import axios from "axios";

export default function Reviews() {
  const { id } = useParams();
  const [book, setBook] = useState<any>();
  const [reviews, setReviews] = useState<any>([]);
  const [newReview, setNewReview] = useState("");
  useEffect(() => {
    const fetchBookReview = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books/${id}`);
        console.log(response.data);
        setBook(response.data);
        setReviews(response.data.reviews);
      } catch (error: any) {
        console.error("Error fetching book review:", error);
      }
    };
    fetchBookReview();
  }, []);
  useEffect(() => {
    setReviews(reviews[id] || []);
  }, [id]);

  const handleSubmitReview = async () => {
    if (newReview.trim() === "") return;
    try {
      const response = await axios.post(`${BASE_URL}/books/${id}/reviews`, {
        review: newReview,
      });
      console.log(response);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setReviews([...reviews, { user: "You", review: newReview }]);

    setNewReview("");
  };

  return (
    <div className="p-4 w-full h-full bg-primary/95 flex flex-col">
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
          <h1 className="text-2xl font-bold mb-4 text-white">
            Reviews for: {book?.title}
          </h1>
          <img
            src={book?.image}
            alt="Book Cover"
            className="w-fit h-60 object-fit rounded-md mb-4 shadow-lg"
          />
          <p className="text-gray-200 my-2">Author: {book?.author}</p>

          {/* Reviews Section */}
          <div className="bg-white p-4 rounded-lg shadow-md h-80 overflow-y-auto space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="flex items-start space-x-3 p-3 border-b last:border-none"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                    {/* {review.user.charAt(0)} */}A
                  </div>
                  {/* Review Content */}
                  <div>
                    <p className="font-semibold">
                      Anoymous
                      {/* {review.user} */}
                    </p>
                    <p className="text-gray-700">{review?.review}</p>
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
      <div className="rounded-md bg-white p-4 flex items-center gap-2 shadow-lg border-t w-full max-w-2xl mx-auto">
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
