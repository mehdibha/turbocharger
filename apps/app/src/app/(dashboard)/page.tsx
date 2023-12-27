import { notFound, redirect } from "next/navigation";
import { Price, Product, prisma } from "@turbocharger/database";
import { Badge, Button, CheckCircleIcon, ExternalLinkIcon } from "@turbocharger/ui";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { getSession } from "@/modules/auth/services";
import { UpgradePlanModal } from "@/modules/payment/components/upgrade-plan-modal";

export default async function DashboardPage() {
  const plans = await prisma.product.findMany({
    where: {
      metadata: {
        path: ["type"],
        equals: "site_plan",
      },
      active: true,
    },
    include: {
      price: true,
    },
  });

  return (
    <AppPageLayout title="Site overview">
      <div className="mt-8 grid grid-cols-12 gap-8">
        {/* <Overview name={"site.name"} url={""} planName={currentPlan?.name} /> */}
        {/* <PlanStatus plans={plans} siteId={params.siteId} currentPlan={null} /> */}
      </div>
    </AppPageLayout>
  );
}

interface SiteOverviewProps {
  name: string | null;
  url: string;
  planName?: string;
}

const Overview = (props: SiteOverviewProps) => {
  const { name, url, planName } = props;
  return (
    <div className="bg-card/50 col-span-12 flex w-full items-start justify-between rounded-xl border p-6 shadow-md">
      <div>
        <h2 className="text-3xl font-semibold">{name}</h2>
        <a
          href={url}
          target="_blank"
          className="text-muted-foreground flex items-center space-x-1 hover:underline"
        >
          <span>{url}</span>
          <ExternalLinkIcon size={20} />
        </a>
      </div>
      <Badge>{planName ?? "Free"} plan</Badge>
    </div>
  );
};

type Plan = Product & { price: Price[] };
interface PlanStatusProps {
  plans: Plan[];
  currentPlan: Plan;
  siteId: string;
}

const PlanStatus = (props: PlanStatusProps) => {
  const { currentPlan, plans, siteId } = props;

  return (
    <div className="bg-card/50 col-span-6 rounded-xl border p-6 shadow-md">
      {
        <>
          <h2 className="text-xl font-semibold">Upgrade your site</h2>
          <p className="text-muted-foreground mt-2">
            Get instant access to premium features
          </p>
          <ul className="mt-4 space-y-1">
            {["Custom domains", "Manual publishing", "And much more"].map(
              (feature, index) => (
                <li key={index} className="flex items-center space-x-1">
                  <CheckCircleIcon size={16} />
                  <span>{feature}</span>
                </li>
              )
            )}
          </ul>
          <UpgradePlanModal plans={plans} currentPlan={currentPlan} siteId={siteId}>
            <Button fullWidth color="primary" className="mt-4">
              Upgrade now
            </Button>
          </UpgradePlanModal>
        </>
      }
    </div>
  );
};
