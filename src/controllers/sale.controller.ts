import type { Request, Response } from "express";
import * as SaleModel from "../models/sale.model.js";
import { buildPagination, type PaginationInput } from "../middlewares/validate-pagination.js";

export const getSales = async (req: Request, res: Response) => {
    try {
        const { page, limit } = res.locals.pagination as PaginationInput;
        const { rows, total } = await SaleModel.getAllSales(page, limit);
        res.json({ data: rows, pagination: buildPagination(page, limit, total) });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
};

export const getSale = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const sale = await SaleModel.getSaleById(id);
        if (!sale) {
            res.status(404).json({ error: "Venta no encontrada" });
            return;
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la venta" });
    }
};

export const createSale = async (req: Request, res: Response) => {
    try {
        const { name, quantity, customerId } = req.body;
        const sale = await SaleModel.insertSale(name, quantity, customerId);
        res.status(201).json(sale);
    } catch (error) {
        if ((error as { code?: string }).code === "23503") {
            res.status(400).json({ errors: { customerId: ["el cliente no existe"] } });
            return;
        }
        res.status(500).json({ error: "Error al crear la venta" });
    }
};

