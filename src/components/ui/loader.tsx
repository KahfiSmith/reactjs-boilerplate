import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  label?: string;
  className?: string;
  iconClassName?: string;
};

export function Loader({
  label = "Loading...",
  className,
  iconClassName,
}: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2
        className={cn("h-10 w-10 animate-spin text-slate-700", iconClassName)}
        aria-hidden="true"
      />
      <p className="text-sm text-slate-600" role="status" aria-live="polite">
        {label}
      </p>
    </div>
  );
}
