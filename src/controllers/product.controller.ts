import type { Request, Response } from "express";
import * as ProductModel from "../models/product.model.js";

export const getMenu = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.json(products);
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

