import { z } from "zod";

// Simplified Yarn schema for populated references
const yarnReferenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  brand: z.string().optional(),
  // Add other yarn fields as needed when you have the full Yarn schema
});

const photoSchema = z.object({
  _id: z.string().optional(),
  filePath: z.string(),
  isPrimary: z.boolean().default(false),
  photoType: z.enum(["progress", "finished", "detail", "inspiration", "other"]).optional(),
  caption: z.string().max(500).optional(),
  takenAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});

const yarnUsedSchema = z.object({
  _id: z.string().optional(),
  yarn: yarnReferenceSchema,
  isPrimary: z.boolean().default(false),
  quantityUsed: z.number().positive(),
  quantityUnit: z.enum(["skeins", "balls", "grams", "meters"]).default("skeins"),
  costPerUnit: z.number().nonnegative().optional(),
  currency: z.string().length(3).toUpperCase().default("EUR"),
  notes: z.string().max(500).optional(),
});

const additionalCostSchema = z.object({
  _id: z.string().optional(),
  description: z.string().min(1).max(200),
  amount: z.number().positive(),
  currency: z.string().length(3).toUpperCase().default("EUR"),
  category: z.enum(["notions", "pattern", "tools", "other"]).optional(),
  purchaseDate: z.coerce.date().optional(),
  notes: z.string().max(500).optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});

export const ProjectSchema = z.object({
  _id: z.string(), // MongoDB ObjectId
  id: z.string().optional(), // Keep for backwards compatibility if needed
  name: z.string().min(1).max(200),
  comments: z.string().max(2000).optional(),
  projectType: z.enum(["knitting", "crochet"]),
  status: z.enum(["active", "completed", "frogged", "hibernating"]).default("active"),
  startDate: z.coerce.date().optional(),
  completionDate: z.coerce.date().optional(),
  photos: z.array(photoSchema).default([]),
  yarnsUsed: z.array(yarnUsedSchema).default([]),
  additionalCosts: z.array(additionalCostSchema).default([]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  // Virtual fields (computed by backend)
  totalYarnCost: z.number().optional(),
  totalAdditionalCost: z.number().optional(),
  totalProjectCost: z.number().optional(),
  primaryYarn: yarnUsedSchema.optional(), // The yarn marked as isPrimary: true
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
