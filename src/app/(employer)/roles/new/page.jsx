import { getPermissions } from "@/features/roles/api/roles";
import { RoleForm } from "@/features/roles/components/RoleForm";
import { createRoleAction } from "@/features/roles/actions/roles";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "New role — Smart Hiring",
};

export default async function NewRolePage() {
  const { data: permissions } = await getPermissions();

  return (
    <>
      <PageHeader
        badge="Access control"
        title="Create role"
        description="Define a new role with permissions for your team"
      />
      <RoleForm action={createRoleAction} permissions={permissions} />
    </>
  );
}
