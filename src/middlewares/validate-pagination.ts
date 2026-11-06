import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int("page debe ser un numero entero").min(1, "page debe ser mayor o igual a 1").default(1),
  limit: z.coerce.number().int("limit debe ser un numero entero").min(1, "limit debe ser mayor o igual a 1").max(100, "limit no puede ser mayor a 100").default(10),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const result = paginationSchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }
  res.locals.pagination = result.data;
  next();
};

export const buildPagination = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});

