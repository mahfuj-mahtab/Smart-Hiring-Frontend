import { getEmployerMe } from "@/features/dashboard/api/dashboard";
import { getJobs } from "@/features/jobs/api/jobs";
import { getApplications } from "@/features/applications/api/applications";
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";
import { APPLICATION_STAGES } from "@/features/applications/constants/stages";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard — Smart Hiring",
};

async function getDashboardStats() {
  try {
    const [openJobsRes, applicationsRes] = await Promise.all([
      getJobs({ status: "open", page_size: 1 }),
      getApplications({ page_size: 100 }),
    ]);

    const stageCounts = {};
    APPLICATION_STAGES.forEach((stage) => {
      stageCounts[stage] = 0;
    });
    (applicationsRes.data || []).forEach((app) => {
      if (stageCounts[app.stage] !== undefined) {
        stageCounts[app.stage] += 1;
      }
    });

    return {
      openJobs: openJobsRes.pagination?.count ?? openJobsRes.data?.length ?? 0,
      totalApplications:
        applicationsRes.pagination?.count ?? applicationsRes.data?.length ?? 0,
      stageCounts,
    };
  } catch {
    return {};
  }
}

export default async function DashboardPage() {
  const [{ data: user }, stats] = await Promise.all([
    getEmployerMe(),
    getDashboardStats(),
  ]);
  return <DashboardContent user={user} stats={stats} />;
}
