"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black/30 backdrop-blur-md border-b border-white/10 text-white py-4 px-8 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl font-bold hover:text-purple-400 transition">
          WeatherWise
        </h1>
      </Link>
      <nav className="flex gap-6">
        <Link href="/about" className="hover:text-purple-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-purple-400 transition">
          Contact
        </Link>
      </nav>
    </header>
  );
}
