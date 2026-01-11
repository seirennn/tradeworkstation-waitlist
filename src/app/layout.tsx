import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Using Playfair Display for the serif look
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: "TradeWorkstation Waitlist",
  description: "Join the waitlist to be notified when we launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-[#0a0a0a] text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
