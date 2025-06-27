"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Search, Loader } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState("");        // Holds the input city name
  const [loading, setLoading] = useState(false); // Tracks if the form is submitting
  const router = useRouter();                  // Next.js router for navigation

  // Handles form submission to fetch weather data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    if (!city.trim()) {
      toast.error("Please enter a city name."); // Show error if input is empty
      return;
    }

    setLoading(true); // Set loading state
    router.push(`/city/${city.trim()}`); // Navigate to dynamic city route
    // No need to reset loading or input, as component unmounts on navigation
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 sm:p-10 rounded-2xl w-full max-w-md shadow-2xl"
      >
        {/* App title and description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            WeatherWise
          </h1>
          <p className="text-blue-200 mt-2">Your real-time weather companion</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative flex items-center">
            {/* Search icon inside input */}
            <Search className="absolute left-4 text-gray-400" size={20} />

            <input
              type="text"
              placeholder="E.g., Addis Ababa, Tokyo"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-inner"
            />
          </div>

          {/* Submit button with loading state */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-100 disabled:opacity-75 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" size={20} />
                <span>Loading...</span>
              </div>
            ) : (
              "Get Weather"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
