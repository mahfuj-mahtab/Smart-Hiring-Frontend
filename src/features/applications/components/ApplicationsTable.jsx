"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { FileText, ExternalLink, Filter, Star, Eye, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { DataTable } from "@/components/tables/DataTable";
import { StageBadge } from "@/features/applications/components/StageBadge";
import {
  APPLICATION_STAGES,
  STAGE_LABELS,
} from "@/features/applications/constants/stages";
import { formatDate } from "@/lib/format-date";
import { toProxiedMediaUrl } from "@/lib/media-url";
import { applicationReviewUrl } from "@/features/applications/utils/review-query";

export function ApplicationsTable({ applications, pagination, jobs = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentStage = searchParams.get("stage") || "";
  const currentJob = searchParams.get("job") || "";
  const listQuery = Object.fromEntries(searchParams.entries());

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const columns = [
    {
      key: "candidate_name",
      label: "Candidate",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {(row.candidate_name || row.candidate_email || "?")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={applicationReviewUrl(row.id, listQuery)}
                className="font-medium hover:text-primary hover:underline"
              >
                {row.candidate_name || row.candidate_email}
              </Link>
              {row.is_shortlisted && (
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{row.candidate_email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "job_title",
      label: "Job",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-foreground/90">{row.job_title}</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => row.phone || "—",
    },
    {
      key: "years_of_experience",
      label: "Experience",
      render: (row) =>
        row.years_of_experience != null ? `${row.years_of_experience} yrs` : "—",
    },
    {
      key: "cv_url",
      label: "CV",
      render: (row) =>
        row.cv_url ? (
          <Button variant="outline" size="sm" asChild className="h-8 rounded-lg px-2.5">
            <a href={toProxiedMediaUrl(row.cv_url)} target="_blank" rel="noopener noreferrer">
              <FileText className="h-3.5 w-3.5" />
              View
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </Button>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "stage",
      label: "Stage",
      render: (row) => <StageBadge stage={row.stage} />,
    },
    {
      key: "applied_at",
      label: "Applied",
      sortable: true,
      render: (row) => formatDate(row.applied_at),
    },
    {
      key: "review",
      label: "",
      render: (row) => (
        <Button variant="outline" size="sm" className="rounded-lg" asChild>
          <Link href={applicationReviewUrl(row.id, listQuery)}>
            <Eye className="h-3.5 w-3.5" />
            Review
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="filter-toolbar">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Filters</p>
            <p className="text-xs text-muted-foreground">Narrow down your pipeline</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground sm:hidden" />
            <NativeSelect
              value={currentStage}
              onChange={(e) => updateFilter("stage", e.target.value)}
              disabled={pending}
              wrapperClassName="w-full sm:w-44"
            >
              <option value="">All stages</option>
              {APPLICATION_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {STAGE_LABELS[stage]}
                </option>
              ))}
            </NativeSelect>
          </div>
          <NativeSelect
            value={currentJob}
            onChange={(e) => updateFilter("job", e.target.value)}
            disabled={pending}
            wrapperClassName="w-full sm:w-56"
          >
            <option value="">All jobs</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="premium-card border-0 p-1 sm:p-2">
        <DataTable
        columns={columns}
        data={applications}
        pagination={pagination}
        searchPlaceholder="Search candidates or jobs..."
        emptyTitle="No applications yet"
        emptyDescription="Applications will appear here when candidates apply to your jobs"
        />
      </div>
    </div>
  );
}
