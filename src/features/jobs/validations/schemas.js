import { z } from "zod";

const employmentTypes = ["full_time", "part_time", "contract", "internship", "temporary"];
const workModes = ["onsite", "hybrid", "remote"];
const experienceLevels = ["entry", "junior", "mid", "senior", "lead", "executive"];
const jobStatuses = ["draft", "open", "closed"];

const optionalNumber = z
  .union([z.string(), z.number(), z.null()])
  .optional()
  .transform((val) => {
    if (val === null || val === undefined || val === "") return null;
    const num = Number(val);
    return Number.isNaN(num) ? null : num;
  });

const jobFields = {
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  department: z.string().optional(),
  location: z.string().optional(),
  employment_type: z.enum(employmentTypes),
  work_mode: z.enum(workModes),
  experience_level: z.enum(experienceLevels),
  salary_min: optionalNumber,
  salary_max: optionalNumber,
  salary_currency: z.string().length(3).optional().default("USD"),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  application_deadline: z.string().optional().nullable(),
  vacancies: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => Number(val) || 1),
  status: z.enum(jobStatuses).optional().default("draft"),
};

export const jobCreateSchema = z.object(jobFields).refine(
  (data) => {
    if (data.salary_min != null && data.salary_max != null) {
      return data.salary_max >= data.salary_min;
    }
    return true;
  },
  { message: "Maximum salary must be greater than minimum", path: ["salary_max"] }
);

export const jobUpdateSchema = jobCreateSchema;
