import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TipSpark - Personalized Content Tipping",
  description: "Spark joy with personalized content tips. Support creators with crypto tips on Farcaster.",
};

function Navigation() {
  return (
    <nav className="border-b border-primary/20 bg-surface/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            TipSpark
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-text hover:text-primary transition-colors">
              Discover
            </Link>
            <Link href="/builder" className="text-text hover:text-primary transition-colors">
              Builder Mode
            </Link>
            <button className="bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
