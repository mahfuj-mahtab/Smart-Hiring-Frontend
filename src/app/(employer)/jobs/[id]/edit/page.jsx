import { notFound } from "next/navigation";
import { getJob } from "@/features/jobs/api/jobs";
import { JobForm } from "@/features/jobs/components/JobForm";
import { updateJobAction } from "@/features/jobs/actions/jobs";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Edit job — Smart Hiring",
};

export default async function EditJobPage({ params }) {
  const { id } = await params;
  const { data: job } = await getJob(id);

  if (!job) notFound();

  return (
    <>
      <PageHeader title={`Edit ${job.title}`} description="Update job posting details" />
      <JobForm action={updateJobAction} job={job} isEdit />
    </>
  );
}
