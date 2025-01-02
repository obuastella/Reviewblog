import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-black">
          ReviewBlog<span className="text-yellow-400">.</span>
        </div>
        <Link
          to="/get-started"
          className="bg-yellow-300 text-black font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
