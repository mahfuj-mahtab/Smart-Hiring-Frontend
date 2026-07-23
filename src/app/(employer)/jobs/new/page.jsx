import { JobForm } from "@/features/jobs/components/JobForm";
import { createJobAction } from "@/features/jobs/actions/jobs";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "New job — Smart Hiring",
};

export default function NewJobPage() {
  return (
    <>
      <PageHeader
        badge="Recruiting"
        title="New job"
        description="Create a new job posting for your careers page"
      />
      <JobForm action={createJobAction} />
    </>
  );
}
