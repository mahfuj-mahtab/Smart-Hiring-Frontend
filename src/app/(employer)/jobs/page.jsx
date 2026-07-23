import { getJobs } from "@/features/jobs/api/jobs";
import { JobsList } from "@/features/jobs/components/JobsList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jobs — Smart Hiring",
};

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const { data, pagination } = await getJobs(params);
  return <JobsList jobs={data} pagination={pagination} />;
}
