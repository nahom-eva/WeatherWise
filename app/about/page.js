"use client";
import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-black/30 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl w-full max-w-2xl shadow-2xl text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold">About WeatherWise</h1>
        <p className="text-lg text-left text-gray-300 leading-relaxed">
          WeatherWise is your real-time weather companion built with Next.js. It
          demonstrates dynamic routing, client-side data fetching, form
          validation, and responsive UI design using Tailwind CSS, DaisyUI, and
          Framer Motion for smooth animations.
        </p>
        <p className="text-lg text-left text-gray-300 leading-relaxed">
          This project was crafted to showcase modern frontend skills, clean
          UI/UX practices, and practical Next.js features including dynamic
          routing and API integration.
        </p>
      </motion.div>
    </main>
  );
}
