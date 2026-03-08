
import { useQuery } from "@tanstack/react-query";
import { getAppStatus } from "@/lib/api";

export const appStatusQueryKey = ["app-status"] as const;

export function useAppStatus() {
  return useQuery({
    queryKey: appStatusQueryKey,
    queryFn: () => getAppStatus(),
  });
}
