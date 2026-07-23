import { notFound } from "next/navigation";
import { getPublicJobs } from "@/features/careers/api/careers";
import { getPublicOrganization } from "@/features/organization/api/organization";
import { CareersHome } from "@/features/careers/components/CareersHome";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers — Smart Hiring",
};

export default async function CareersPage() {
  try {
    const [{ data: jobs }, orgResult] = await Promise.all([
      getPublicJobs(),
      getPublicOrganization().catch(() => ({ data: null })),
    ]);
    const orgName = orgResult.data?.name || jobs[0]?.organization_name || null;
    return <CareersHome jobs={jobs} orgName={orgName} />;
  } catch {
    notFound();
  }
}
