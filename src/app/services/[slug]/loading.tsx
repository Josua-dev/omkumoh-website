import { Skeleton, PageHeroSkeleton } from "@/components/ui/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <div>
      <PageHeroSkeleton />
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Skeleton className="mb-4 h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </div>
              <div>
                <Skeleton className="mb-4 h-8 w-48" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton variant="circular" className="mt-1 h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="rounded-2xl border border-border/50 p-8 shadow-sm">
                <Skeleton className="mb-4 h-6 w-40" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-dark-blue p-8">
                <Skeleton className="mb-2 h-6 w-48 bg-white/10" />
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
