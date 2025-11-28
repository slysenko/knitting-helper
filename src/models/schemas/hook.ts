import { z } from "zod";

export const HookSchema = z.object({
  _id: z.string(),
  sizeMm: z.number().positive(),
  sizeUs: z.string().optional(),
  material: z.string().max(200).optional(),
  brand: z.string().max(200).optional(),
  price: z.number().nonnegative().optional(),
  currency: z.string().max(10).default("EUR"),
  notes: z.string().max(2000).optional(),
  usedInProjects: z.array(z.any()).optional(), // Virtual field from backend
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

export const HookResponseSchema = z.object({
  data: HookSchema,
});

export const HookListResponseSchema = z.object({
  data: z.array(HookSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  success: z.boolean(),
});

export type HookData = z.infer<typeof HookSchema>;

export type HookCreateParams = Omit<Partial<HookData>, "_id" | "createdAt" | "updatedAt"> & {
  sizeMm: number;
};

export type HookUpdateParams = Omit<Partial<HookData>, "_id" | "createdAt" | "updatedAt">;
