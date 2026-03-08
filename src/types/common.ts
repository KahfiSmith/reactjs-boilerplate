import type { ReactNode } from "react";

export type WithChildren = {
  children: ReactNode;
};

export type ErrorPageProps = {
  message?: string;
  onRetry?: () => void;
};
