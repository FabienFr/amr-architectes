import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ContactButton from "./components/ContactButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const norwester = localFont({
  src: "../../public/fonts/norwester.otf",
  variable: "--font-norwester",
});

export const metadata: Metadata = {
  title: "AMR Architectes",
  description: "Architecture durable à Biarritz et Bordeaux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${norwester.variable} antialiased`}>
        {children}
        <ContactButton />
      </body>
    </html>
  );
}
