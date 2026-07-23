import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/feedback/EmptyState";
import {
  EMPLOYMENT_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  WORK_MODE_LABELS,
  formatSalary,
} from "@/features/jobs/constants/job";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format-date";

export function CareersHome({ jobs, orgName }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 page-enter">
      <div className="relative mb-14 overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-10 text-center sm:p-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          We&apos;re hiring
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {orgName ? (
            <>
              Join <span className="gradient-text">{orgName}</span>
            </>
          ) : (
            "Open positions"
          )}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg leading-relaxed">
          Discover opportunities that match your skills and grow your career with us.
        </p>
        {jobs.length > 0 && (
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            {jobs.length} open {jobs.length === 1 ? "position" : "positions"}
          </p>
        )}
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          title="No open positions"
          description="Check back soon — we're always looking for great talent"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => {
            const salary = formatSalary(
              job.salary_min,
              job.salary_max,
              job.salary_currency
            );
            return (
              <article
                key={job.id}
                className="premium-card group flex flex-col p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {job.title}
                    </h2>
                    {job.department && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        {job.department}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {job.vacancies} {job.vacancies === 1 ? "role" : "roles"}
                  </Badge>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    {EMPLOYMENT_TYPE_LABELS[job.employment_type]}
                  </span>
                  <Badge variant="outline">{WORK_MODE_LABELS[job.work_mode]}</Badge>
                  <Badge variant="outline">
                    {EXPERIENCE_LEVEL_LABELS[job.experience_level]}
                  </Badge>
                </div>

                {salary && (
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
                    <DollarSign className="h-4 w-4 text-primary" />
                    {salary}
                  </p>
                )}

                {job.application_deadline && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Apply by {formatDate(job.application_deadline)}
                  </p>
                )}

                <div className="mt-auto pt-6">
                  <Button asChild variant="gradient" className="w-full rounded-xl sm:w-auto">
                    <Link href={`${ROUTES.CAREERS}/${job.id}`}>
                      View & apply
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
