import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import LadyReading from "../../lotties/lady.json";
export default function SecondOnboarding() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-start p-6 lg:p-16">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <Lottie
            className="w-full md:w-[70%] h-[70%]"
            animationData={LadyReading}
            loop
          />
        </div>
        <div className="mt-8 w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Your Next Favorite Book Awaits 📚
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to{" "}
            <span className="font-semibold text-primary">ReviewBlog</span>
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
          <div className="flex flex-col gap-y-2 justify-center md:justify-start gap-x-4 items-center md:flex-row">
            <Link
              to="/register"
              className="md:w-fit w-full bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-primary/90 transition-all"
            >
              Let’s Explore
            </Link>
            <Link
              to="/login"
              className="md:w-fit w-full  border-2 border-primary text-black font-bold py-3 px-8 rounded-lg hover:bg-primary/90 hover:text-white transition-all"
            >
              Already a Member?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
