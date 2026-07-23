import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerEmployerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  organization_name: z.string().min(2, "Organization name is required"),
  organization_slug: z
    .string()
    .min(2, "Subdomain must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
});

export const registerCandidateSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
});

export const roleSchema = z.object({
  name: z.string().min(2, "Role name is required"),
  permission_ids: z.array(z.string()).optional(),
});
