import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorPage({ message, onRetry }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-3 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-6 max-w-xl text-sm text-slate-600">
        {message ?? "An unexpected error happened while rendering this page."}
      </p>
      <div className="flex items-center gap-3">
        {onRetry ? (
          <Button type="button" onClick={onRetry}>
            Try Again
          </Button>
        ) : null}
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
