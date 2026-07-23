import { notFound } from "next/navigation";
import { getPublicJobs } from "@/features/careers/api/careers";
import { CareersHome } from "@/features/careers/components/CareersHome";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers — Smart Hiring",
};

export default async function CareersPage() {
  try {
    const { data: jobs } = await getPublicJobs();
    const orgName = jobs[0]?.organization_name || null;
    return <CareersHome jobs={jobs} orgName={orgName} />;
  } catch {
    notFound();
  }
}
