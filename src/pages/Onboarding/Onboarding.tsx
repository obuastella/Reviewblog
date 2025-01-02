import { Link } from "react-router-dom";

export default function SecondOnboarding() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-16">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <img
            // src="/book-stack.png" // Replace with your image path
            alt="Stack of books"
            width={500}
            height={500}
            className="rounded-lg shadow-lg border"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Your Next Favorite Book Awaits 📚
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to{" "}
            <span className="font-semibold text-yellow-400">ReviewBlog</span>
            —your gateway to discovering hidden literary gems, sharing your
            thoughts, and connecting with a vibrant community of readers.
            Whether you're a casual reader or a bookworm, we've got something
            for you.
          </p>
          <ul className="text-left text-gray-700 space-y-4 mb-8">
            <li>✔️ Find honest reviews for trending books.</li>
            <li>✔️ Unleash your inner critique.</li>
            <li>✔️ Connect with book lovers just like you.</li>
          </ul>
          <div>
            <Link
              to="/register"
              className="bg-yellow-400 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-400/90 transition-all"
            >
              Let’s Explore
            </Link>
            <Link
              to="/login"
              className="ml-4 border-2 border-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 hover:text-white transition-all"
            >
              Already a Member?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
