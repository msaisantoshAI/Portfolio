import type { Metadata } from 'next';
import { Fraunces, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import SkyEnvironment from '@/components/SkyEnvironment';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MouseGlow from '@/components/MouseGlow';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

const acorn = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-acorn',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sai Santosh Madhari | Product Designer & AI Builder',
  description: 'Product Designer with Data Science & AI background. Case studies across AI, enterprise SaaS, and design systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body className={`${acorn.variable} ${outfit.variable} ${plusJakarta.variable} font-sans antialiased bg-[#2a7ae7] dark:bg-[#03050c] text-zinc-900 dark:text-slate-100 flex flex-col min-h-screen overflow-x-clip transition-colors duration-1000`}>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white rounded-br-lg">
            Skip to main content
          </a>
          <Preloader />
          <CustomCursor />
          <SkyEnvironment />
          <MouseGlow />
          <Navigation />
          <main id="main-content" className="flex-1 relative z-10 w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
