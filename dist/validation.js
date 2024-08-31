"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.todoSchema = exports.updateSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string().nullable().optional(),
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.updateSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .optional()
        .refine((val) => val !== "", {
        message: "password cannot be an empty string.",
    }),
    firstname: zod_1.z
        .string()
        .optional()
        .refine((val) => val !== "", {
        message: "Firstame cannot be an empty string.",
    }),
    lastname: zod_1.z
        .string()
        .nullable()
        .optional()
        .refine((val) => val !== "", {
        message: "Lastname cannot be an empty string.",
    }),
});
exports.todoSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.updateTodoSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .optional()
        .refine((val) => val !== "", {
        message: "password cannot be an empty string.",
    }),
    description: zod_1.z
        .string()
        .optional()
        .refine((val) => val !== "", {
        message: "Firstame cannot be an empty string.",
    }),
    done: zod_1.z.boolean().optional(),
});
