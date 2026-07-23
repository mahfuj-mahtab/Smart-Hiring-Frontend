"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ViewToggle } from "@/features/applications/components/ViewToggle";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { ApplicationsKanban } from "@/features/applications/components/ApplicationsKanban";
import { ApplicationsStats } from "@/features/applications/components/ApplicationsStats";

export function ApplicationsPage({
  applications,
  pagination,
  jobs,
  view = "table",
}) {
  return (
    <>
      <PageHeader
        badge="Hiring pipeline"
        title="Applications"
        description="Track candidates from first application to hire — switch between table and kanban views"
        action={<ViewToggle />}
      />
      <ApplicationsStats applications={applications} />
      {view === "kanban" ? (
        <ApplicationsKanban applications={applications} />
      ) : (
        <ApplicationsTable
          applications={applications}
          pagination={pagination}
          jobs={jobs}
        />
      )}
    </>
  );
}
