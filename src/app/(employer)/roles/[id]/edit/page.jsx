import { notFound } from "next/navigation";
import { getRole, getPermissions } from "@/features/roles/api/roles";
import { RoleForm } from "@/features/roles/components/RoleForm";
import { updateRoleAction } from "@/features/roles/actions/roles";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Edit role — Smart Hiring",
};

export default async function EditRolePage({ params }) {
  const { id } = await params;
  const [{ data: role }, { data: permissions }] = await Promise.all([
    getRole(id),
    getPermissions(),
  ]);

  if (!role) notFound();

  return (
    <>
      <PageHeader
        title={`Edit ${role.name}`}
        description={role.is_system ? "System role (read-only)" : "Update role permissions"}
      />
      <RoleForm
        action={updateRoleAction}
        role={role}
        permissions={permissions}
        readOnly={role.is_system}
      />
    </>
  );
}
