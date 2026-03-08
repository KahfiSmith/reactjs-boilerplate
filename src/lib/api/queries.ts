import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiRequestOptions, AppStatusResponse } from "@/types";

type QueryOptions = Omit<ApiRequestOptions, "method">;
type MutationOptions = Omit<ApiRequestOptions, "body" | "method">;

export function getQuery<TResponse>(
  path: string,
  options: QueryOptions = {},
) {
  return apiClient<TResponse>(path, {
    ...options,
    method: "GET",
  });
}

export function postQuery<
  TResponse,
  TBody extends ApiRequestOptions["body"] = Record<string, unknown>,
>(
  path: string,
  body: TBody,
  options: MutationOptions = {},
) {
  return apiClient<TResponse>(path, {
    ...options,
    body,
    method: "POST",
  });
}

export function getAppStatus(options: QueryOptions = {}) {
  return getQuery<AppStatusResponse>(apiEndpoints.appStatus, options);
}
