import type { Request, Response } from "express";
import * as ProductModel from "../models/product.model.js";
import { buildPagination, type PaginationInput } from "../middlewares/validate-pagination.js";

export const getMenu = async (req: Request, res: Response) => {
    try {
        const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
        if (maxPrice !== undefined && (Number.isNaN(maxPrice) || maxPrice < 0)) {
            res.status(400).json({ errors: { maxPrice: ["maxPrice debe ser un numero mayor o igual a 0"] } });
            return;
        }
        const { page, limit } = res.locals.pagination as PaginationInput;
        const { rows, total } = await ProductModel.getAllProducts(maxPrice, page, limit);
        res.json({ data: rows, pagination: buildPagination(page, limit, total) });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el menu" });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await ProductModel.getProductById(id);
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, cost, stock } = req.body;
        const product = await ProductModel.insertProduct(name, description, price, cost, stock);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, description, price, cost, stock } = req.body;
        const product = await ProductModel.updateProduct(id, name, description, price, cost, stock);
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

