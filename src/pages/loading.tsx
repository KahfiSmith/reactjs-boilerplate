import { Loader } from "@/components/common";

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Loader label="Loading page..." />
    </div>
  );
}
