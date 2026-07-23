import { z } from "zod";
import { EMPLOYEE_SIZE_OPTIONS } from "@/features/organization/constants/organization";

const employeeSizeValues = EMPLOYEE_SIZE_OPTIONS.map((option) => option.value);

export const organizationUpdateSchema = z.object({
  name: z.string().min(1, "Organization name is required").max(255),
  industry: z.string().max(100).optional().or(z.literal("")),
  employee_size: z
    .string()
    .refine(
      (value) => !value || employeeSizeValues.includes(value),
      "Select a valid company size"
    )
    .optional()
    .or(z.literal("")),
});
