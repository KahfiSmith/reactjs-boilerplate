import { ErrorBoundary } from "@/app/error-boundary";
import { AppProviders } from "@/app/providers";
import { AppRoutes } from "@/app/routes";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
}
