import { QueryClient } from "@tanstack/react-query";

// This is a simplified query client for static sites
// It doesn't attempt to make any API calls

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // For a static site, we don't want to fetch any data
      enabled: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      // For a static site, we don't want to allow mutations
      onMutate: () => {
        console.warn("Mutations are not supported in static mode");
        return Promise.resolve(undefined);
      },
      retry: false,
    },
  },
});