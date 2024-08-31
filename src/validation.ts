import { z } from "zod";

export const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string().nullable().optional(),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const updateSchema = z.object({
  password: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message: "password cannot be an empty string.",
    }),
  firstname: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message: "Firstame cannot be an empty string.",
    }),
  lastname: z
    .string()
    .nullable()
    .optional()
    .refine((val) => val !== "", {
      message: "Lastname cannot be an empty string.",
    }),
});

export const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const updateTodoSchema = z.object({
  title: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message: "password cannot be an empty string.",
    }),
  description: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message: "Firstame cannot be an empty string.",
    }),
  done: z.boolean().optional(),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
export type signinSchemaType = z.infer<typeof signinSchema>;
export type todoSchemaType = z.infer<typeof todoSchema>;
