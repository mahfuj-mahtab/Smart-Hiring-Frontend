import { notFound } from "next/navigation";
import { getMember } from "@/features/members/api/members";
import { getRoles } from "@/features/roles/api/roles";
import { MemberForm } from "@/features/members/components/MemberForm";
import { updateMemberAction } from "@/features/members/actions/members";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Edit member — Smart Hiring",
};

export default async function EditMemberPage({ params }) {
  const { id } = await params;
  const [{ data: member }, { data: roles }] = await Promise.all([
    getMember(id),
    getRoles({ page_size: 100 }),
  ]);

  if (!member) notFound();

  return (
    <>
      <PageHeader
        title={`Edit ${member.user_name || member.user_email}`}
        description="Update member role and status"
      />
      <MemberForm
        action={updateMemberAction}
        member={member}
        roles={roles}
        isEdit
      />
    </>
  );
}
