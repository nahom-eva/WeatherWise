"use client";

import { Toaster } from "react-hot-toast";
// import ClientOnly from "../components/ClientOnly"; // if used for hydration
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <Header /> {/* Our shared header */}
        <main className="flex-grow">{children}</main>
        <Footer /> {/* Our shared footer */}
        <>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                background: "#333",
                color: "#fff",
                border: "1px solid #555",
              },
              success: {
                duration: 1000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
              error: {
                duration: 1000,
              },
            }}
          />
        </>
      </body>
    </html>
  );
}
