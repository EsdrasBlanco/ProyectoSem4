import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "el nombre no puede estar vacio"),
  description: z.string().trim().min(1, "la descripcion no puede estar vacia"),
  price: z.number().positive("el precio debe ser mayor a 0"),
  cost: z.number().min(0, "el costo debe ser mayor o igual a 0").optional(),
  stock: z.number().int("el stock debe ser un numero entero").min(0, "el stock debe ser mayor o igual a 0").optional(),
});

// extraer el tipo de dato para typescript desde el schema q creamos
export type ProductInput = z.infer<typeof productSchema>;

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }
  next();
};