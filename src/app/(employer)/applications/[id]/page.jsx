import { notFound } from "next/navigation";
import {
  getApplication,
  getApplicationNeighbors,
} from "@/features/applications/api/applications";
import { ApplicationReview } from "@/features/applications/components/ApplicationReview";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const { data } = await getApplication(id);
    const name = data.candidate_name || data.candidate_email;
    return { title: `${name} — Application review` };
  } catch {
    return { title: "Application review" };
  }
}

export default async function ApplicationReviewPage({ params, searchParams }) {
  const { id } = await params;
  const listQuery = await searchParams;

  const neighborParams = { ...listQuery };
  delete neighborParams.page;
  delete neighborParams.view;

  try {
    const [{ data: application }, { data: neighbors }] = await Promise.all([
      getApplication(id),
      getApplicationNeighbors(id, neighborParams),
    ]);

    return (
      <ApplicationReview
        application={application}
        neighbors={neighbors}
        listQuery={listQuery}
      />
    );
  } catch {
    notFound();
  }
}
