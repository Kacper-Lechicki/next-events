import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${martianMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <BackgroundEffects />

          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
