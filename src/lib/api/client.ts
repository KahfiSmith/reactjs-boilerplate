import type { ApiRequestOptions } from "@/types";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildUrl(
  path: string,
  query?: ApiRequestOptions["query"],
  baseUrl?: string,
) {
  const resolvedBaseUrl =
    baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? window.location.origin;
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(path, resolvedBaseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function isBodyInit(body: ApiRequestOptions["body"]): body is BodyInit {
  return (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ReadableStream ||
    body instanceof ArrayBuffer
  );
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiClient<TResponse>(
  path: string,
  { baseUrl, body, headers, query, ...init }: ApiRequestOptions = {},
): Promise<TResponse> {
  const requestHeaders = new Headers(headers);
  const requestInit: RequestInit = {
    ...init,
    headers: requestHeaders,
  };

  if (body !== undefined && body !== null) {
    if (isBodyInit(body)) {
      requestInit.body = body;
    } else {
      if (!requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json");
      }

      requestInit.body = JSON.stringify(body);
    }
  }

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  const response = await fetch(buildUrl(path, query, baseUrl), requestInit);
  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as TResponse;
}
