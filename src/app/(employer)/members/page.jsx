import { getMembers } from "@/features/members/api/members";
import { MembersList } from "@/features/members/components/MembersList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Members — Smart Hiring",
};

export default async function MembersPage({ searchParams }) {
  const params = await searchParams;
  const { data, pagination } = await getMembers(params);
  return <MembersList members={data} pagination={pagination} />;
}
