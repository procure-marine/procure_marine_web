/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire application.
 * It includes:
 * - Font configuration (Public Sans from Google Fonts)
 * - Global metadata
 * - CartProvider for cart state management
 * - Header and Footer components
 * - Material Symbols icon font
 */

import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Configure Public Sans font
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

// Site metadata
export const metadata: Metadata = {
  title: "Procure Marine - Your Trusted Partner in Marine Supply",
  description: "Delivering quality marine spare parts and safety equipment from Dubai. Your trusted partner for maritime supply solutions worldwide.",
  keywords: ["marine", "spare parts", "safety equipment", "maritime", "Dubai", "shipping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Material Symbols Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${publicSans.variable} font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}>
        {/* Cart Provider wraps the entire app for cart state management */}
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header - sticky navigation */}
            <Header />
            
            {/* Main content area */}
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
