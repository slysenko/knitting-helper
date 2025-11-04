import { z } from "zod";

const photoSchema = z.object({
  filePath: z.string(),
  isPrimary: z.boolean().default(false),
  photoType: z.enum(["progress", "finished", "detail", "inspiration", "other"]).optional(),
  caption: z.string().optional(),
  takenAt: z.coerce.date(),
  createdAt: z.date().default(() => new Date()),
});

const yarnUsedSchema = z.object({
  yarn: z.string(),
  quantityUsed: z.number(),
  quantityUnit: z.enum(["skeins", "balls", "grams", "meters"]).default("skeins"),
  costPerUnit: z.number().optional(),
  currency: z.string().default("EUR"),
  notes: z.string().optional(),
});

const additionalCostSchema = z.object({
  description: z.string(),
  amount: z.number(),
  currency: z.string().default("EUR"),
  category: z.enum(["notions", "pattern", "tools", "other"]).optional(),
  purchaseDate: z.coerce.date(),
  notes: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  comments: z.string().optional(),
  projectType: z.enum(["knitting", "crochet"]),
  primaryYarn: z.string().optional(),
  status: z.enum(["active", "completed", "frogged", "hibernating"]).default("active"),
  startDate: z.coerce.date().optional(),
  completionDate: z.coerce.date().optional(),
  photos: z.array(photoSchema).default([]),
  yarnsUsed: z.array(yarnUsedSchema).default([]),
  additionalCosts: z.array(additionalCostSchema).default([]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const ProjectResponseSchema = z.object({
    data: ProjectSchema,
});

export const ProjectListResponseSchema = z.object({
    data: z.array(ProjectSchema),
    count: z.number().optional(),
    page: z.number().optional(),
    success: z.boolean(),
});

export type ProjectData = z.infer<typeof ProjectSchema>;
