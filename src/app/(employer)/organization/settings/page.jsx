import { notFound, redirect } from "next/navigation";
import { getOrganization } from "@/features/organization/api/organization";
import { OrganizationSettingsForm } from "@/features/organization/components/OrganizationSettingsForm";
import { updateOrganizationAction } from "@/features/organization/actions/organization";
import { PageHeader } from "@/components/layout/PageHeader";
import { getServerSession } from "@/lib/auth/session";
import { can } from "@/lib/permissions";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Organization settings — Smart Hiring",
};

export default async function OrganizationSettingsPage() {
  const session = await getServerSession();
  if (
    !session?.permissions ||
    !can(session.permissions, PERMISSIONS.ORGANIZATION_CHANGE, session.isOwner)
  ) {
    redirect(ROUTES.DASHBOARD);
  }

  try {
    const { data: organization } = await getOrganization();
    return (
      <>
        <PageHeader
          badge="Branding"
          title="Organization settings"
          description="Customize your public profile, logo, and branding for your careers page and subdomain home"
        />
        <OrganizationSettingsForm
          action={updateOrganizationAction}
          organization={organization}
        />
      </>
    );
  } catch {
    notFound();
  }
}
