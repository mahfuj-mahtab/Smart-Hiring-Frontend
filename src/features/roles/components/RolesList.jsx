"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/DataTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { PermissionGate } from "@/components/layout/PermissionGate";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { deleteRoleAction } from "@/features/roles/actions/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format-date";
import { MESSAGES } from "@/constants/messages";

export function RolesList({ roles, pagination }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteRoleAction(deleteId);
      if (result.success) {
        toast.success(MESSAGES.roles.deleted);
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.name}</span>
          {row.is_system && <Badge variant="secondary">System</Badge>}
        </div>
      ),
    },
    {
      key: "permission_count",
      label: "Permissions",
      render: (row) => row.permission_count,
    },
    {
      key: "created_at",
      label: "Created",
      sortable: true,
      render: (row) => formatDate(row.created_at),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <PermissionGate permission={PERMISSIONS.ROLE_CHANGE}>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`${ROUTES.ROLES}/${row.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </PermissionGate>
          <PermissionGate permission={PERMISSIONS.ROLE_DELETE}>
            {!row.is_system && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(row.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </PermissionGate>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        badge="Access control"
        title="Roles"
        description="Manage organization roles and permissions"
        action={
          <PermissionGate permission={PERMISSIONS.ROLE_ADD}>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={ROUTES.ROLES_NEW}>New role</Link>
            </Button>
          </PermissionGate>
        }
      />
      <DataTable
        columns={columns}
        data={roles}
        pagination={pagination}
        emptyTitle="No roles yet"
        emptyDescription="Create your first role to manage team permissions"
        emptyAction={
          <PermissionGate permission={PERMISSIONS.ROLE_ADD}>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={ROUTES.ROLES_NEW}>Create role</Link>
            </Button>
          </PermissionGate>
        }
      />
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete role"
        description={MESSAGES.roles.deleteConfirm}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        loading={pending}
      />
    </>
  );
}
