import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-black">
          ReviewBlog<span className="text-primary">.</span>
        </div>
        <Link
          to="/get-started"
          className="bg-primary/80 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
