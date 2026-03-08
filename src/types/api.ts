export type QueryValue = string | number | boolean | null | undefined;

export type ApiRequestBody = BodyInit | Record<string, unknown> | null;

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  baseUrl?: string;
  body?: ApiRequestBody;
  query?: Record<string, QueryValue>;
};

export type AppStatusResponse = {
  message: string;
  updatedAt: string;
};
