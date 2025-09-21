import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TipSpark - Spark joy with personalized content tips',
  description: 'A Base miniapp that lets users tip content creators based on personal preferences and likes within frames, fostering a sustainable content ecosystem.',
  keywords: ['tipping', 'content creators', 'base', 'miniapp', 'crypto'],
  authors: [{ name: 'TipSpark Team' }],
  openGraph: {
    title: 'TipSpark',
    description: 'Spark joy with personalized content tips',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
