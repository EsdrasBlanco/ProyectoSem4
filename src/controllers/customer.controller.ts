import type { Request, Response } from "express";
import * as CustomerModel from "../models/customer.model.js";
import { buildPagination, type PaginationInput } from "../middlewares/validate-pagination.js";

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const { page, limit } = res.locals.pagination as PaginationInput;
        const { rows, total } = await CustomerModel.getAllCustomers(limit, (page - 1) * limit);
        res.json({ data: rows, pagination: buildPagination(page, limit, total) });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
};

export const getCustomer = async (req: Request, res: Response) => {    
    try {
        const id = Number(req.params.id);
        const customer = await CustomerModel.getCustomerById(id);
        if (!customer) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
};

export const createCustomer = async (req: Request, res: Response) => {   
    try {
        const { name, email, phone } = req.body;
        const customer = await CustomerModel.insertCustomer(name, email, phone);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, email, phone } = req.body;
        const customer = await CustomerModel.updateCustomer(id, name, email, phone);
        if (!customer) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente" });
    }
};

