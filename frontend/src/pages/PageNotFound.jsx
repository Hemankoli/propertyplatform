import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          className="text-9xl"
        >
          🚀
        </motion.div>
        <h1 className="mt-6 text-6xl font-extrabold drop-shadow-lg">404</h1>
        <p className="mt-2 text-xl font-medium">Oops! Page not found.</p>
        <p className="mt-1 text-gray-200">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to={"/"}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-sm shadow font-semibold hover:scale-105 hover:bg-gray-100 transition"
        >
          <FaHome size={20} />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
