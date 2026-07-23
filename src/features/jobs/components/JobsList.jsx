"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Trash2, Users, Globe, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/DataTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { PermissionGate } from "@/components/layout/PermissionGate";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import {
  deleteJobAction,
  publishJobAction,
  closeJobAction,
} from "@/features/jobs/actions/jobs";
import {
  EMPLOYMENT_TYPE_LABELS,
  WORK_MODE_LABELS,
  JOB_STATUS,
  JOB_STATUS_LABELS,
} from "@/features/jobs/constants/job";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format-date";
import { MESSAGES } from "@/constants/messages";

function StatusBadge({ status }) {
  const variants = {
    draft: "secondary",
    open: "default",
    closed: "outline",
  };
  return (
    <Badge variant={variants[status] || "secondary"}>
      {JOB_STATUS_LABELS[status] || status}
    </Badge>
  );
}

export function JobsList({ jobs, pagination }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteJobAction(deleteId);
      if (result.success) {
        toast.success(MESSAGES.jobs.deleted);
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handlePublish = (id) => {
    startTransition(async () => {
      const result = await publishJobAction(id);
      if (result.success) {
        toast.success(MESSAGES.jobs.published);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleClose = (id) => {
    startTransition(async () => {
      const result = await closeJobAction(id);
      if (result.success) {
        toast.success(MESSAGES.jobs.closed);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (row) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: "department",
      label: "Department",
      render: (row) => row.department || "—",
    },
    {
      key: "work_mode",
      label: "Mode",
      render: (row) => WORK_MODE_LABELS[row.work_mode] || row.work_mode,
    },
    {
      key: "employment_type",
      label: "Type",
      render: (row) => EMPLOYMENT_TYPE_LABELS[row.employment_type] || row.employment_type,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "application_count",
      label: "Applications",
      render: (row) => (
        <Link
          href={`${ROUTES.APPLICATIONS}?job=${row.id}`}
          className="text-primary hover:underline"
        >
          {row.application_count ?? 0}
        </Link>
      ),
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
        <div className="flex gap-1">
          <PermissionGate permission={PERMISSIONS.CANDIDATE_VIEW}>
            <Button variant="ghost" size="icon" asChild title="View applications">
              <Link href={`${ROUTES.APPLICATIONS}?job=${row.id}`}>
                <Users className="h-4 w-4" />
              </Link>
            </Button>
          </PermissionGate>
          <PermissionGate permission={PERMISSIONS.JOB_CHANGE}>
            {row.status === JOB_STATUS.DRAFT && (
              <Button
                variant="ghost"
                size="icon"
                title="Publish"
                onClick={() => handlePublish(row.id)}
                disabled={pending}
              >
                <Globe className="h-4 w-4" />
              </Button>
            )}
            {row.status === JOB_STATUS.OPEN && (
              <Button
                variant="ghost"
                size="icon"
                title="Close"
                onClick={() => handleClose(row.id)}
                disabled={pending}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" asChild>
              <Link href={`${ROUTES.JOBS}/${row.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </PermissionGate>
          <PermissionGate permission={PERMISSIONS.JOB_DELETE}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteId(row.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </PermissionGate>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        badge="Recruiting"
        title="Jobs"
        description="Manage job postings for your organization"
        action={
          <PermissionGate permission={PERMISSIONS.JOB_ADD}>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={`${ROUTES.JOBS}/new`}>New job</Link>
            </Button>
          </PermissionGate>
        }
      />
      <DataTable
        columns={columns}
        data={jobs}
        pagination={pagination}
        searchPlaceholder="Search jobs..."
        emptyTitle="No jobs yet"
        emptyDescription="Create your first job posting to start hiring"
        emptyAction={
          <PermissionGate permission={PERMISSIONS.JOB_ADD}>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={`${ROUTES.JOBS}/new`}>Create job</Link>
            </Button>
          </PermissionGate>
        }
      />
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete job"
        description={MESSAGES.jobs.deleteConfirm}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        loading={pending}
      />
    </>
  );
}
