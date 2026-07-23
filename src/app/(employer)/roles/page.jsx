import { getRoles } from "@/features/roles/api/roles";
import { RolesList } from "@/features/roles/components/RolesList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Roles — Smart Hiring",
};

export default async function RolesPage({ searchParams }) {
  const params = await searchParams;
  const { data, pagination } = await getRoles(params);
  return <RolesList roles={data} pagination={pagination} />;
}
