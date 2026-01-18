import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';

import './globals.css';

import Navbar from '@/components/Navbar';
import BackgroundEffects from '@/components/BackgroundEffects';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const martianMono = Martian_Mono({
  variable: '--font-martian-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DevEvent',
  description: "The hub for every dev event you mustn't miss!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${martianMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Navbar />
        <BackgroundEffects />

        <main>{children}</main>
      </body>
    </html>
  );
}
