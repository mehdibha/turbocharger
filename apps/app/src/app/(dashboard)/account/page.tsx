import { AppPageLayout } from "@/components/layout/app-page-layout";
import { AccountDetails } from "@/modules/auth/components/account-details";
import { LogoutButton } from "@/modules/auth/components/logout-button";
import { getUser } from "@/modules/auth/services";
import { InvoicesList } from "@/modules/payment/components/invoices-list";
import { SubscriptionsList } from "@/modules/payment/components/subscriptions-list";
import { getUserInvoices, getUserSubscriptions } from "@/modules/payment/services";

export default async function AccountPage() {
  const user = await getUser();
  const subscriptions = await getUserSubscriptions();
  const invoices = await getUserInvoices();

  return (
    <AppPageLayout container title="Account" cta={<LogoutButton />} className="space-y-8">
      <AccountDetails email={user.email} name={user.name} />
      <SubscriptionsList subscriptions={subscriptions} />
      <InvoicesList invoices={invoices} />
    </AppPageLayout>
  );
}
