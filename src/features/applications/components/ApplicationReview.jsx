"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Link2,
  Mail,
  Phone,
  Star,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import { StageBadge } from "@/features/applications/components/StageBadge";
import { CvViewer } from "@/features/applications/components/CvViewer";
import { PermissionGate } from "@/components/layout/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import {
  APPLICATION_STAGES,
  STAGE_LABELS,
} from "@/features/applications/constants/stages";
import {
  toggleShortlistAction,
  updateApplicationStageAction,
} from "@/features/applications/actions/applications";
import {
  applicationReviewUrl,
  applicationsListUrl,
} from "@/features/applications/utils/review-query";
import { formatDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";

function getInitials(name, email) {
  const source = name || email || "?";
  return source
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function InfoRow({ icon: Icon, label, value, href }) {
  if (!value || value === "—") return null;
  const content = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary hover:underline break-all"
    >
      {value}
    </a>
  ) : (
    <p className="font-medium">{value}</p>
  );

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 text-sm">{content}</div>
    </div>
  );
}

export function ApplicationReview({
  application,
  neighbors,
  listQuery = {},
}) {
  const router = useRouter();
  const [shortlisted, setShortlisted] = useState(application.is_shortlisted);
  const [stage, setStage] = useState(application.stage);
  const [pending, startTransition] = useTransition();

  const displayName =
    application.candidate_name || application.candidate_email;
  const backUrl = applicationsListUrl(listQuery);

  const prevUrl = neighbors.previous_id
    ? applicationReviewUrl(neighbors.previous_id, listQuery)
    : null;
  const nextUrl = neighbors.next_id
    ? applicationReviewUrl(neighbors.next_id, listQuery)
    : null;

  const handleShortlist = () => {
    const nextValue = !shortlisted;
    startTransition(async () => {
      const result = await toggleShortlistAction(application.id, nextValue);
      if (result.success) {
        setShortlisted(nextValue);
        toast.success(nextValue ? "Candidate shortlisted" : "Removed from shortlist");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleStageChange = (event) => {
    const nextStage = event.target.value;
    startTransition(async () => {
      const result = await updateApplicationStageAction(application.id, nextStage);
      if (result.success) {
        setStage(nextStage);
        toast.success("Stage updated");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Button asChild variant="ghost" className="-ml-2 w-fit rounded-xl">
          <Link href={backUrl}>
            <ArrowLeft className="h-4 w-4" />
            Back to applications
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Candidate{" "}
            <span className="font-semibold text-foreground">
              {neighbors.position}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {neighbors.total}
            </span>
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={!prevUrl || pending}
              asChild={!!prevUrl}
            >
              {prevUrl ? (
                <Link href={prevUrl}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={!nextUrl || pending}
              asChild={!!nextUrl}
            >
              {nextUrl ? (
                <Link href={nextUrl}>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="premium-card border-0 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="avatar-ring">
              <div className="flex h-16 w-16 items-center justify-center text-xl font-bold text-primary">
                {getInitials(application.candidate_name, application.candidate_email)}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {displayName}
                </h1>
                {shortlisted && (
                  <Badge className="gap-1 border-0 bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Shortlisted
                  </Badge>
                )}
              </div>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Applied for {application.job_title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StageBadge stage={stage} />
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Applied {formatDate(application.applied_at)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <PermissionGate permission={PERMISSIONS.CANDIDATE_CHANGE}>
              <Button
                type="button"
                variant={shortlisted ? "default" : "outline"}
                className={cn(
                  "rounded-xl",
                  shortlisted &&
                    "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/25"
                )}
                onClick={handleShortlist}
                disabled={pending}
              >
                <Star
                  className={cn("h-4 w-4", shortlisted && "fill-current")}
                />
                {shortlisted ? "Shortlisted" : "Shortlist"}
              </Button>
              <NativeSelect
                value={stage}
                onChange={handleStageChange}
                disabled={pending}
                wrapperClassName="w-44"
                aria-label="Application stage"
              >
                {APPLICATION_STAGES.map((item) => (
                  <option key={item} value={item}>
                    {STAGE_LABELS[item]}
                  </option>
                ))}
              </NativeSelect>
            </PermissionGate>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <div className="premium-card border-0 p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Applicant details
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow
                icon={Mail}
                label="Email"
                value={application.candidate_email}
                href={`mailto:${application.candidate_email}`}
              />
              <InfoRow icon={Phone} label="Phone" value={application.phone || "—"} />
              <InfoRow
                icon={Briefcase}
                label="Experience"
                value={
                  application.years_of_experience != null
                    ? `${application.years_of_experience} years`
                    : "—"
                }
              />
              <InfoRow
                icon={Link2}
                label="LinkedIn"
                value={application.linkedin_url || "—"}
                href={application.linkedin_url}
              />
              <InfoRow
                icon={Globe}
                label="Portfolio"
                value={application.portfolio_url || "—"}
                href={application.portfolio_url}
              />
            </div>
          </div>

          {application.cover_letter && (
            <div className="premium-card border-0 p-6">
              <h2 className="mb-3 text-lg font-semibold tracking-tight">
                Cover letter
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {application.cover_letter}
              </p>
            </div>
          )}
        </div>

        <CvViewer cvUrl={application.cv_url} candidateName={displayName} />
      </div>

      {application.cv_url && (
        <div className="flex justify-end">
          <Button variant="outline" className="rounded-xl" asChild>
            <a href={application.cv_url} target="_blank" rel="noopener noreferrer">
              Open CV in new tab
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
