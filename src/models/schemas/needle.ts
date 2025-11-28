import { z } from "zod";

export const NeedleSchema = z.object({
  _id: z.string(),
  sizeMm: z.number().positive(),
  sizeUs: z.string().optional(),
  type: z.enum(["straight", "circular", "dpn"]),
  lengthCm: z.number().positive().optional(),
  material: z.string().max(200).optional(),
  brand: z.string().max(200).optional(),
  price: z.number().nonnegative().optional(),
  currency: z.string().max(10).default("EUR"),
  notes: z.string().max(2000).optional(),
  usedInProjects: z.array(z.any()).optional(), // Virtual field from backend
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

export const NeedleResponseSchema = z.object({
  data: NeedleSchema,
});

export const NeedleListResponseSchema = z.object({
  data: z.array(NeedleSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  success: z.boolean(),
});

export type NeedleData = z.infer<typeof NeedleSchema>;

export type NeedleCreateParams = Omit<Partial<NeedleData>, "_id" | "createdAt" | "updatedAt"> & {
  sizeMm: number;
  type: "straight" | "circular" | "dpn";
};

export type NeedleUpdateParams = Omit<Partial<NeedleData>, "_id" | "createdAt" | "updatedAt">;
