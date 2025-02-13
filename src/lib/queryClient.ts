import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data dianggap stale setelah 5 menit
      cacheTime: 1000 * 60 * 30, // Cache disimpan selama 30 menit
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
}); 