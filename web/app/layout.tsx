import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B20 Speedrun',
  description:
    'Gamified walkthrough of every B20 (Base native token standard) feature. Deploy two tokens, run all 40 steps, renounce admin — sealed onchain forever.',
  openGraph: {
    title: 'B20 Speedrun',
    description: 'A guided speedrun through every B20 capability on Base.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
