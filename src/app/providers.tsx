import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";
import type { WithChildren } from "@/types";

export function AppProviders({ children }: WithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
