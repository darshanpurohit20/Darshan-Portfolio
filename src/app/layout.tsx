import type { Metadata } from 'next';
import './globals.css';
import { Cursor } from '@/components/layout/Cursor';
import { Loader } from '@/components/layout/Loader';
import { Navbar } from '@/components/layout/Navbar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { LenisProvider } from '@/components/layout/LenisProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://darshanpurohit-portfolio.vercel.app/'),
  title: 'Darshan Purohit — AI Engineer & Backend Developer',
  description: 'Building intelligent systems for the future. RAG pipelines, semantic search, deepfake detection, scalable AI infrastructure.',
  keywords: ['AI Engineer', 'Backend Developer', 'RAG', 'FastAPI', 'PyTorch', 'Deepfake Detection'],
  openGraph: {
    title: 'Darshan Purohit',
    description: 'AI Engineer & Backend Developer',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darshan Purohit',
    description: 'AI Engineer & Backend Developer',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LenisProvider>
          <Loader />
          <Cursor />
          <CommandPalette />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
