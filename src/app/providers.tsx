'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { EnvironmentProvider } from '@/context/EnvironmentContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
     return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <EnvironmentProvider>
        {children}
      </EnvironmentProvider>
    </ThemeProvider>
  );
}
