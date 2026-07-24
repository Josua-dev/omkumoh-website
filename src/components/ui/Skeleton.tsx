import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200/60",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 w-full rounded",
        variant === "rectangular" && "rounded-xl",
        className
      )}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 p-6 shadow-sm">
      <Skeleton variant="rectangular" className="mb-4 h-12 w-12 rounded-xl" />
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-5/6" />
    </div>
  );
}

export function PageHeroSkeleton() {
  return (
    <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">
        <Skeleton className="mb-4 h-4 w-32 bg-white/10" />
        <Skeleton className="mb-2 h-12 w-3/4 bg-white/10" />
        <Skeleton className="h-6 w-1/2 bg-white/10" />
      </div>
    </section>
  );
}
