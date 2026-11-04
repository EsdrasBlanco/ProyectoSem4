import { pool } from "../config/db.js";

const COLUMNS = "id, nombre AS name, descripcion AS description, precio AS price, costo AS cost, stock";

export const getAllProducts = async () => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM menu ORDER BY id`);
    return result.rows;
};

export const getProductById = async (id: number) => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM menu WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
};

export const insertProduct = async (name: string, description: string, price: number, cost?: number, stock?: number) => {
    const result = await pool.query(
        `INSERT INTO menu (nombre, descripcion, precio, costo, stock) VALUES ($1, $2, $3, $4, $5) RETURNING ${COLUMNS}`,
        [name, description, price, cost ?? 0, stock ?? 0]
    );
    return result.rows[0];
};

export const updateProduct = async (id: number, name: string, description: string, price: number, cost?: number, stock?: number) => {
    const result = await pool.query(
        `UPDATE menu SET nombre = $1, descripcion = $2, precio = $3, costo = COALESCE($4, costo), stock = COALESCE($5, stock) WHERE id = $6 RETURNING ${COLUMNS}`,
        [name, description, price, cost ?? null, stock ?? null, id]
    );
    return result.rows[0] ?? null;
};