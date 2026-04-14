import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus',
});

export const metadata: Metadata = {
  title: 'Antigravity Portfolio',
  description: 'AI Product Designer Portfolio',
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MouseGlow from '@/components/MouseGlow';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${plusJakarta.variable} font-sans antialiased bg-[#03050c] flex flex-col min-h-screen overflow-x-clip text-slate-100 cursor-none`}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white rounded-br-lg">Skip to main content</a>
          <Preloader />
          <CustomCursor />
          <MouseGlow />
          <Navigation />
          <main id="main-content" className="flex-1 relative z-10 w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
