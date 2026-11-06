import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const saleSchema = z.object({
  name: z.string().trim().min(1, "el nombre no puede estar vacio").max(100, "el nombre no puede superar los 100 caracteres"),
  quantity: z.number().int("la cantidad debe ser un numero entero").min(1, "la cantidad debe ser mayor a 0"),
  customerId: z.number().int("customerId debe ser un numero entero").positive("customerId debe ser mayor a 0"),
});

export type SaleInput = z.infer<typeof saleSchema>;

export const validateSale = (req: Request, res: Response, next: NextFunction) => {
  const result = saleSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }
  next();
};

