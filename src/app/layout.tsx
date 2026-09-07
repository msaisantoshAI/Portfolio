import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import SkyEnvironment from '@/components/SkyEnvironment';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MouseGlow from '@/components/MouseGlow';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import WeatherFeatureGuideModal from '@/components/WeatherFeatureGuideModal';
import WeatherHUD from '@/components/WeatherHUD';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-sans',
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sai Santosh Madhari | Product Designer & AI Builder',
  description: 'Product Designer combining design, technology, AI, and business thinking to solve complex problems across B2B and B2C products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#F8F9FA] dark:bg-[#0A0A0B] text-zinc-950 dark:text-zinc-100 flex flex-col min-h-screen overflow-x-clip transition-colors duration-700`}>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-zinc-950 dark:bg-white focus:text-white rounded-br-lg">
            Skip to main content
          </a>
          <Preloader />
          <WeatherFeatureGuideModal />
          <CustomCursor />
          <SkyEnvironment />
          <MouseGlow />
          <Navigation />
          <WeatherHUD />
          <main id="main-content" className="flex-1 relative z-10 w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
