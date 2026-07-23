import { getApplications } from "@/features/applications/api/applications";
import { getJobs } from "@/features/jobs/api/jobs";
import { ApplicationsPage } from "@/features/applications/components/ApplicationsPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Applications — Smart Hiring",
};

export default async function ApplicationsRoute({ searchParams }) {
  const params = await searchParams;
  const view = params.view || "table";

  const fetchParams = { ...params };
  if (view === "kanban") {
    fetchParams.page_size = 100;
  }

  const [{ data: applications, pagination }, { data: jobs }] = await Promise.all([
    getApplications(fetchParams),
    getJobs({ page_size: 100, status: "open" }).catch(() => ({ data: [] })),
  ]);

  const allJobs =
    jobs.length > 0
      ? jobs
      : (
          await getJobs({ page_size: 100 }).catch(() => ({ data: [] }))
        ).data;

  return (
    <ApplicationsPage
      applications={applications}
      pagination={pagination}
      jobs={allJobs}
      view={view}
    />
  );
}
