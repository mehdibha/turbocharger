import { Skeleton } from "@turbocharger/ui";
import { AppPageLayout } from "@/components/layout/app-page-layout";

export default function Loading() {
  return (
    <AppPageLayout
      container
      title="Account"
      cta={<Skeleton className="h-12 w-12" />}
      className="space-y-8"
    >
      {[...Array(3)].map((_, i) => (
        <Skeleton className="h-[300px] w-full" key={i} />
      ))}
    </AppPageLayout>
  );
}
