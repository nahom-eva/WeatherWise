export default function Footer() {
    return (
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 text-gray-400 py-4 px-8 text-center mt-10">
        &copy; {new Date().getFullYear()} WeatherWise. All rights reserved.
      </footer>
    );
  }
  