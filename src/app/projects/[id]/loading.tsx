import { Skeleton, PageHeroSkeleton } from "@/components/ui/Skeleton";

export default function ProjectDetailLoading() {
  return (
    <div>
      <section className="relative flex min-h-[40vh] items-end bg-dark-blue">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-8">
          <Skeleton className="mb-6 h-4 w-32 bg-white/10" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
            <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
          </div>
          <Skeleton className="mb-2 h-12 w-3/4 bg-white/10" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-4 w-40 bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
        </div>
      </section>
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <Skeleton className="mb-4 h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
              <div>
                <Skeleton className="mb-4 h-8 w-48" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <Skeleton variant="circular" className="mt-1 h-5 w-5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 p-8 shadow-sm">
                <Skeleton className="mb-4 h-6 w-36" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="mb-4">
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-dark-blue p-8">
                <Skeleton className="mb-2 h-6 w-40 bg-white/10" />
                <Skeleton className="mb-4 h-4 w-full bg-white/10" />
                <Skeleton className="h-10 w-full rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
