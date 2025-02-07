import { Link } from "react-router-dom";

export default function footer() {
  return (
    <footer className="py-8 bg-zinc-900 text-white text-center">
      <p className="text-lg mb-4">Connect with us:</p>
      <div className="space-x-4 mb-6">
        <Link to="#" className="text-gray-400 hover:text-white">
          Facebook
        </Link>
        <Link to="#" className="text-gray-400 hover:text-white">
          Twitter
        </Link>
        <Link to="#" className="text-gray-400 hover:text-white">
          Instagram
        </Link>
      </div>
      <p className="text-sm text-gray-400">
        © 2025 ReviewBlog. All rights reserved.
      </p>
    </footer>
  );
}
