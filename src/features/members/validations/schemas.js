import { z } from "zod";

export const employerUserCreateSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().optional().default(""),
  last_name: z.string().optional().default(""),
});

export const memberCreateSchema = z
  .object({
    user: z.string().uuid().optional(),
    new_user: employerUserCreateSchema.optional(),
    role: z.string().uuid("Role is required"),
    is_active: z.boolean().optional().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.user && data.new_user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either an existing user or new user details, not both.",
        path: ["user"],
      });
    }
    if (!data.user && !data.new_user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "User is required.",
        path: ["user"],
      });
    }
  });

export const memberUpdateSchema = z.object({
  role: z.string().uuid("Role is required"),
  is_active: z.boolean(),
});
