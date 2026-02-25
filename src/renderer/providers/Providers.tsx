'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import AntdThemeProvider from './antd-theme-provider/AntdThemeProvider';

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AntdThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AntdThemeProvider>
  );
}

export default Providers;
