"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Thermometer, Droplets, Wind, Gauge, Eye } from "lucide-react";

// Reusable card component for displaying individual weather detail
const WeatherDetailCard = ({ icon, label, value, unit }) => (
  <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center">
    {icon}
    <p className="text-sm text-gray-300">{label}</p>
    <p className="text-xl font-semibold">
      {value} <span className="text-base font-normal">{unit}</span>
    </p>
  </div>
);

export default function CityWeather() {
  const { cityName } = useParams();        // Get city name from route params
  const router = useRouter();              // Router to navigate back on error
  const [weather, setWeather] = useState(null);  // Stores weather API response
  const [loading, setLoading] = useState(true);  // Tracks loading state

  // Fetch weather data when the city name changes
  useEffect(() => {
    if (!cityName) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if (!apiKey) throw new Error("API Key is missing.");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${decodeURIComponent(cityName)}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          if (response.status === 404) throw new Error("City not found");
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data); // Save weather data
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast.error(error.message || "Could not fetch weather."); // Show error toast
        router.push("/"); // Navigate back to home on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWeather();
  }, [cityName, router]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="loading loading-ring loading-lg text-white"></div>
      </main>
    );
  }

  // If no weather data, return null (fallback)
  if (!weather) return null;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-2xl text-white relative"
      >
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="absolute cursor-pointer top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* City name and weather status */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="text-lg text-gray-300 capitalize">
            {weather.weather[0].description}
          </p>

          {/* Weather icon and temperature */}
          <div className="flex items-center my-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather icon"
              className="w-28 h-28 sm:w-32 sm:h-32 -my-4"
            />
            <p className="text-6xl sm:text-7xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
          </div>
        </motion.div>

        {/* Weather details section (Feels Like, Humidity, Wind, etc.) */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <WeatherDetailCard 
            icon={<Thermometer size={24} className="text-blue-300" />}
            label="Feels Like"
            value={Math.round(weather.main.feels_like)}
            unit="°C"
          />
          <WeatherDetailCard 
            icon={<Droplets size={24} className="text-sky-400" />}
            label="Humidity"
            value={weather.main.humidity}
            unit="%"
          />
          <WeatherDetailCard 
            icon={<Wind size={24} className="text-gray-300" />}
            label="Wind Speed"
            value={weather.wind.speed.toFixed(1)}
            unit="m/s"
          />
          <WeatherDetailCard 
            icon={<Gauge size={24} className="text-red-400" />}
            label="Pressure"
            value={weather.main.pressure}
            unit="hPa"
          />
          <WeatherDetailCard 
            icon={<Eye size={24} className="text-purple-300" />}
            label="Visibility"
            value={(weather.visibility / 1000).toFixed(1)}
            unit="km"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
