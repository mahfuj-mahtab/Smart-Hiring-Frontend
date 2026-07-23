"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import {
  CURRENCIES,
  EMPLOYMENT_TYPE_LABELS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVEL_LABELS,
  EXPERIENCE_LEVELS,
  JOB_STATUS,
  JOB_STATUS_LABELS,
  WORK_MODE_LABELS,
  WORK_MODES,
} from "@/features/jobs/constants/job";

function Section({ title, description, children }) {
  return (
    <FormSection title={title} description={description}>
      {children}
    </FormSection>
  );
}

const selectClass =
  "flex h-10 w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const textareaClass =
  "flex w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function JobForm({ action, job, isEdit = false }) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {job?.id && <input type="hidden" name="id" value={job.id} />}

      <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

      <Section title="Basic information" description="Core details candidates will see first.">
        <FormField label="Job title" name="title" error={state?.fieldErrors?.title} required>
          <Input
            id="title"
            name="title"
            defaultValue={job?.title || ""}
            placeholder="e.g. Senior Software Engineer"
            required
            className="rounded-lg"
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Department" name="department" error={state?.fieldErrors?.department}>
            <Input
              id="department"
              name="department"
              defaultValue={job?.department || ""}
              placeholder="Engineering"
              className="rounded-lg"
            />
          </FormField>
          <FormField label="Location" name="location" error={state?.fieldErrors?.location}>
            <Input
              id="location"
              name="location"
              defaultValue={job?.location || ""}
              placeholder="New York, NY or Remote"
              className="rounded-lg"
            />
          </FormField>
        </div>

        <FormField
          label="Job description"
          name="description"
          error={state?.fieldErrors?.description}
          required
        >
          <textarea
            id="description"
            name="description"
            defaultValue={job?.description || ""}
            rows={6}
            required
            placeholder="Describe the role and what makes it exciting..."
            className={textareaClass}
          />
        </FormField>
      </Section>

      <Section title="Role details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Employment type"
            name="employment_type"
            error={state?.fieldErrors?.employment_type}
            required
          >
            <select
              id="employment_type"
              name="employment_type"
              defaultValue={job?.employment_type || EMPLOYMENT_TYPES.FULL_TIME}
              required
              className={selectClass}
            >
              {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Work mode" name="work_mode" error={state?.fieldErrors?.work_mode} required>
            <select
              id="work_mode"
              name="work_mode"
              defaultValue={job?.work_mode || WORK_MODES.HYBRID}
              required
              className={selectClass}
            >
              {Object.entries(WORK_MODE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Experience level"
            name="experience_level"
            error={state?.fieldErrors?.experience_level}
            required
          >
            <select
              id="experience_level"
              name="experience_level"
              defaultValue={job?.experience_level || EXPERIENCE_LEVELS.MID}
              required
              className={selectClass}
            >
              {Object.entries(EXPERIENCE_LEVEL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Open positions" name="vacancies" error={state?.fieldErrors?.vacancies}>
            <Input
              id="vacancies"
              name="vacancies"
              type="number"
              min={1}
              defaultValue={job?.vacancies || 1}
              className="rounded-lg"
            />
          </FormField>
        </div>
      </Section>

      <Section title="Compensation" description="Optional — helps attract the right candidates.">
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Min salary" name="salary_min" error={state?.fieldErrors?.salary_min}>
            <Input
              id="salary_min"
              name="salary_min"
              type="number"
              min={0}
              defaultValue={job?.salary_min ?? ""}
              className="rounded-lg"
            />
          </FormField>
          <FormField label="Max salary" name="salary_max" error={state?.fieldErrors?.salary_max}>
            <Input
              id="salary_max"
              name="salary_max"
              type="number"
              min={0}
              defaultValue={job?.salary_max ?? ""}
              className="rounded-lg"
            />
          </FormField>
          <FormField label="Currency" name="salary_currency" error={state?.fieldErrors?.salary_currency}>
            <select
              id="salary_currency"
              name="salary_currency"
              defaultValue={job?.salary_currency || "USD"}
              className={selectClass}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </Section>

      <Section title="Requirements & benefits">
        <FormField label="Requirements" name="requirements" error={state?.fieldErrors?.requirements}>
          <textarea
            id="requirements"
            name="requirements"
            defaultValue={job?.requirements || ""}
            rows={4}
            placeholder="Skills, education, certifications..."
            className={textareaClass}
          />
        </FormField>
        <FormField
          label="Responsibilities"
          name="responsibilities"
          error={state?.fieldErrors?.responsibilities}
        >
          <textarea
            id="responsibilities"
            name="responsibilities"
            defaultValue={job?.responsibilities || ""}
            rows={4}
            placeholder="Day-to-day responsibilities..."
            className={textareaClass}
          />
        </FormField>
        <FormField label="Benefits" name="benefits" error={state?.fieldErrors?.benefits}>
          <textarea
            id="benefits"
            name="benefits"
            defaultValue={job?.benefits || ""}
            rows={3}
            placeholder="Health insurance, remote stipend, learning budget..."
            className={textareaClass}
          />
        </FormField>
        <FormField
          label="Application deadline"
          name="application_deadline"
          error={state?.fieldErrors?.application_deadline}
        >
          <Input
            id="application_deadline"
            name="application_deadline"
            type="date"
            defaultValue={job?.application_deadline || ""}
            className="rounded-lg"
          />
        </FormField>
      </Section>

      <Section title="Publishing">
        <FormField label="Status" name="status" error={state?.fieldErrors?.status}>
          <select
            id="status"
            name="status"
            defaultValue={job?.status || JOB_STATUS.DRAFT}
            className={selectClass}
          >
            {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
      </Section>

      <Button type="submit" disabled={pending} variant="gradient" size="lg" className="rounded-xl px-8">
        {pending ? "Saving..." : isEdit ? "Update job" : "Create job"}
      </Button>
    </form>
  );
}
