import Typewriter from "@/components/Typewriter";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="mt-10 w-full text-vlack py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">ReviewBlog</span>
        </h1>
        <div className="text-2xl md:text-3xl font-medium mb-6">
          <Typewriter text="Discover Books. Share Reviews. Connect with Readers." />
        </div>
        <p className="text-lg md:text-xl mb-8">
          Your one-stop platform for exploring books, writing reviews, and
          connecting with a community of book lovers.
        </p>
        <div>
          <Link
            to="/get-started"
            className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="#learn-more"
            className="ml-4 border-2 border-yellow-300 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 hover:text-black transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
