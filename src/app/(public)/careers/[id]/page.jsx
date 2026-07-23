import { notFound } from "next/navigation";
import { getPublicJob } from "@/features/careers/api/careers";
import { JobDetail } from "@/features/careers/components/JobDetail";
import { getAccessToken, getAccountType } from "@/lib/auth/cookies";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Job details — Smart Hiring",
};

export default async function CareerJobPage({ params }) {
  const { id } = await params;
  const [accessToken, accountType] = await Promise.all([getAccessToken(), getAccountType()]);

  try {
    const { data: job } = await getPublicJob(id);
    return (
      <JobDetail
        job={job}
        isAuthenticated={!!accessToken}
        accountType={accountType}
      />
    );
  } catch {
    notFound();
  }
}
