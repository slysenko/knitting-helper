import { z } from "zod";

const photoSchema = z.object({
  _id: z.string().optional(),
  filePath: z.string(),
  isPrimary: z.boolean().default(false),
  caption: z.string().max(500).optional(),
  takenAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});

const linkSchema = z.object({
  _id: z.string().optional(),
  url: z.string().url(),
  linkType: z.enum(["shop", "ravelry", "manufacturer", "review", "other"]),
  description: z.string().max(500).optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});

export const YarnSchema = z.object({
  _id: z.string(),
  name: z.string().min(1).max(200),
  brand: z.string().max(200).optional(),
  yarnType: z.string().max(100).optional(),
  fiberContent: z.string().max(500).optional(),
  color: z.string().max(100).optional(),
  lotNumber: z.string().max(100).optional(),
  length: z.number().nonnegative().optional(),
  lengthUnit: z.enum(["meters", "yards", "feet"]).default("meters"),
  weight: z.number().nonnegative().optional(),
  weightUnit: z.enum(["grams", "ounces", "pounds"]).default("grams"),
  pricePerUnit: z.number().nonnegative().optional(),
  currency: z.string().max(10).default("EUR"),
  purchaseDate: z.coerce.date().optional(),
  purchaseLocation: z.string().max(500).optional(),
  quantityInStash: z.number().int().nonnegative().default(1),
  notes: z.string().max(2000).optional(),
  photos: z.array(photoSchema).default([]),
  links: z.array(linkSchema).default([]),
  usedInProjects: z.array(z.any()).optional(), // Virtual field from backend
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const YarnResponseSchema = z.object({
  data: YarnSchema,
});

export const YarnListResponseSchema = z.object({
  data: z.array(YarnSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  success: z.boolean(),
});

export type YarnData = z.infer<typeof YarnSchema>;
export type YarnPhoto = z.infer<typeof photoSchema>;
export type YarnLink = z.infer<typeof linkSchema>;

export type YarnCreateParams = Omit<Partial<YarnData>, "_id" | "createdAt" | "updatedAt"> & {
  name: string;
};

export type YarnUpdateParams = Omit<Partial<YarnData>, "_id" | "createdAt" | "updatedAt">;

export type YarnPhotoParams = Omit<YarnPhoto, "_id" | "createdAt">;
