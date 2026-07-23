import { headers } from "next/headers";
import { getPublicOrganization } from "@/features/organization/api/organization";
import { OrgBrandedHome } from "@/features/organization/components/OrgBrandedHome";
import { PlatformHome } from "@/features/organization/components/PlatformHome";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const headersList = await headers();
  const orgSlug = headersList.get("x-org-slug");

  if (!orgSlug) {
    return <PlatformHome />;
  }

  try {
    const { data: organization } = await getPublicOrganization();
    return <OrgBrandedHome organization={organization} />;
  } catch {
    return <PlatformHome />;
  }
}
