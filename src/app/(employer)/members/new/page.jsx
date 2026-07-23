import { getRoles } from "@/features/roles/api/roles";
import { MemberForm } from "@/features/members/components/MemberForm";
import { createMemberAction } from "@/features/members/actions/members";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Add member — Smart Hiring",
};

export default async function NewMemberPage() {
  const { data: roles } = await getRoles({ page_size: 100 });

  return (
    <>
      <PageHeader title="Add member" description="Search by email to add or create a team member" />
      <MemberForm action={createMemberAction} roles={roles} />
    </>
  );
}
