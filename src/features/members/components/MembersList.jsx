"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, UserX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/DataTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { OwnerGate } from "@/components/layout/PermissionGate";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { deactivateMemberAction } from "@/features/members/actions/members";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format-date";
import { MESSAGES } from "@/constants/messages";

export function MembersList({ members, pagination }) {
  const router = useRouter();
  const [deactivateId, setDeactivateId] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleDeactivate = () => {
    startTransition(async () => {
      const result = await deactivateMemberAction(deactivateId);
      if (result.success) {
        toast.success(MESSAGES.members.deactivated);
        setDeactivateId(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns = [
    {
      key: "user_name",
      label: "Name",
      render: (row) => row.user_name || row.user_email,
    },
    {
      key: "user_email",
      label: "Email",
      render: (row) => row.user_email,
    },
    {
      key: "role_name",
      label: "Role",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.role_name}</span>
          {row.is_owner && <Badge>Owner</Badge>}
        </div>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (row) => (
        <Badge variant={row.is_active ? "default" : "secondary"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Joined",
      sortable: true,
      render: (row) => formatDate(row.created_at),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <OwnerGate>
          {!row.is_owner && (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`${ROUTES.MEMBERS}/${row.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              {row.is_active && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeactivateId(row.id)}
                >
                  <UserX className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          )}
        </OwnerGate>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        badge="Team"
        title="Members"
        description="Manage organization team members"
        action={
          <OwnerGate>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={ROUTES.MEMBERS_NEW}>Add member</Link>
            </Button>
          </OwnerGate>
        }
      />
      <DataTable
        columns={columns}
        data={members}
        pagination={pagination}
        emptyTitle="No members yet"
        emptyDescription="Add team members to your organization"
        emptyAction={
          <OwnerGate>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={ROUTES.MEMBERS_NEW}>Add member</Link>
            </Button>
          </OwnerGate>
        }
      />
      <ConfirmDialog
        open={!!deactivateId}
        onOpenChange={(open) => !open && setDeactivateId(null)}
        title="Deactivate member"
        description={MESSAGES.members.deleteConfirm}
        confirmLabel="Deactivate"
        onConfirm={handleDeactivate}
        loading={pending}
      />
    </>
  );
}
