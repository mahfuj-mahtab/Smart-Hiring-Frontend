"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  Upload,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ApiErrorBanner } from "@/components/forms/FormField";
import { applyToJobAction } from "@/features/careers/actions/apply";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";
import {
  EMPLOYMENT_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  WORK_MODE_LABELS,
  formatSalary,
} from "@/features/jobs/constants/job";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format-date";

function JobSection({ title, content }) {
  if (!content) return null;
  return (
    <section className="content-section space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
        {content}
      </p>
    </section>
  );
}

export function JobDetail({ job, isAuthenticated, accountType }) {
  const [state, formAction, pending] = useActionState(applyToJobAction, null);
  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);
  const loginUrl = `${ROUTES.LOGIN}?next=${encodeURIComponent(`${ROUTES.CAREERS}/${job.id}`)}`;

  useActionToast(state, { successMessage: MESSAGES.applications.applied });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 page-enter">
      <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 rounded-xl">
        <Link href={ROUTES.CAREERS}>
          <ArrowLeft className="h-4 w-4" />
          Back to careers
        </Link>
      </Button>

      <div className="premium-card overflow-hidden border-0 p-0 mb-8">
        <div className="h-2 gradient-bg" />
        <div className="p-8 sm:p-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge className="gradient-bg border-0 text-white">Open</Badge>
            {job.department && <Badge variant="secondary">{job.department}</Badge>}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {job.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            {job.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {job.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4 text-primary" />
              {EMPLOYMENT_TYPE_LABELS[job.employment_type]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              {WORK_MODE_LABELS[job.work_mode]}
            </span>
            <Badge variant="outline">
              {EXPERIENCE_LEVEL_LABELS[job.experience_level]}
            </Badge>
            {salary && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <DollarSign className="h-4 w-4" />
                {salary}
              </span>
            )}
            {job.application_deadline && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Apply by {formatDate(job.application_deadline)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 mb-12">
        <JobSection title="About this role" content={job.description} />
        <JobSection title="Responsibilities" content={job.responsibilities} />
        <JobSection title="Requirements" content={job.requirements} />
        <JobSection title="Benefits" content={job.benefits} />
      </div>

      <div className="premium-card border-0 p-8 sm:p-10">
        <h2 className="text-xl font-semibold tracking-tight">Apply for this position</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Submit your application with your CV. We review every application carefully.
        </p>

        {state?.success ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Application submitted! We&apos;ll be in touch if you&apos;re a match.
            </p>
          </div>
        ) : !isAuthenticated ? (
          <div className="mt-6 space-y-4 rounded-xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in to apply for this position.
            </p>
            <Button asChild variant="gradient" className="rounded-xl">
              <Link href={loginUrl}>Sign in to apply</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              New here?{" "}
              <Link
                href={`${ROUTES.REGISTER_CANDIDATE}?next=${encodeURIComponent(`${ROUTES.CAREERS}/${job.id}`)}`}
                className="font-medium text-primary hover:underline"
              >
                Create a candidate account
              </Link>
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-6 space-y-5">
            {accountType === "employer" && (
              <p className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                Applying with your work account. Your application is sent to this company only.
              </p>
            )}
            <input type="hidden" name="job_id" value={job.id} />
            <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  className="mt-1.5 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="years_of_experience" className="text-sm font-medium">
                  Years of experience
                </label>
                <Input
                  id="years_of_experience"
                  name="years_of_experience"
                  type="number"
                  min={0}
                  max={50}
                  placeholder="5"
                  className="mt-1.5 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="linkedin_url" className="text-sm font-medium">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/you"
                  className="mt-1.5 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="portfolio_url" className="text-sm font-medium">
                  Portfolio URL
                </label>
                <Input
                  id="portfolio_url"
                  name="portfolio_url"
                  type="url"
                  placeholder="https://yoursite.com"
                  className="mt-1.5 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cover_letter" className="text-sm font-medium">
                Cover letter
              </label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                rows={4}
                placeholder="Tell us why you're excited about this role..."
                className="mt-1.5 flex w-full rounded-lg border border-input/80 bg-background/50 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>

            <div>
              <label htmlFor="cv" className="text-sm font-medium">
                CV / Resume <span className="text-destructive">*</span>
              </label>
              <div className="mt-1.5">
                <Input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="rounded-lg file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
                />
              </div>
              {state?.fieldErrors?.cv && (
                <p className="mt-1 text-sm text-destructive">{state.fieldErrors.cv}</p>
              )}
              <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Upload className="h-3 w-3" />
                PDF, DOC, or DOCX — max 5MB
              </p>
            </div>

            <Button
              type="submit"
              disabled={pending}
              variant="gradient"
              size="lg"
              className="rounded-xl w-full sm:w-auto"
            >
              {pending ? "Submitting..." : "Submit application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
