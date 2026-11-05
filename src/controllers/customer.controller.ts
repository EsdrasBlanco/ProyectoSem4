import type { Request, Response } from "express";
import * as CustomerModel from "../models/customer.model.js";

export const getCustomers = async (req: Request, res: Response) => {
    /*#swagger.tags = ['Customers'] #swagger.summary = 'Obtener todos los clientes' */
    try {
        const customers = await CustomerModel.getAllCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
};

export const getCustomer = async (req: Request, res: Response) => {
    /*#swagger.tags = ['Customers'] #swagger.summary = 'Obtener un cliente por id' */
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
    /*#swagger.tags = ['Customers'] #swagger.summary = 'Crear un nuevo cliente' */
    try {
        const { name, email, phone } = req.body;
        const customer = await CustomerModel.insertCustomer(name, email, phone);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    /*#swagger.tags = ['Customers'] #swagger.summary = 'Actualizar un cliente existente' */
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
