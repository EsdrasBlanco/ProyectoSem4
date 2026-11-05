import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(1, "el nombre no puede estar vacio").max(100, "el nombre no puede superar los 100 caracteres"),
  email: z.email("el email no es valido").max(100, "el email no puede superar los 100 caracteres"),
  phone: z.string().trim().min(1, "el celular no puede estar vacio").max(20, "el celular no puede superar los 20 caracteres"),
});

export type CustomerInput = z.infer<typeof customerSchema>;

export const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
  const result = customerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }
  next();
};

