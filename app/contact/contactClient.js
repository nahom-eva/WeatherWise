"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error("Please fill out all fields.");
      return;
    }
    toast.success("Message sent!");
    setEmail("");
    setMessage("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 text-white">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
          <button
            type="submit"
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 rounded-lg py-3 font-bold transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
