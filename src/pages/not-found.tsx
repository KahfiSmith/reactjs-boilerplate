import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}
