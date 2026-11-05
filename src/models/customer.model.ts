import { pool } from "../config/db.js";

const COLUMNS = "id, nombre AS name, email, celular AS phone";

export const getAllCustomers = async () => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM cliente ORDER BY id`);
    return result.rows;
};

export const getCustomerById = async (id: number) => {
    const result = await pool.query(`SELECT ${COLUMNS} FROM cliente WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
};

export const insertCustomer = async (name: string, email: string, phone: string) => {
    const result = await pool.query(
        `INSERT INTO cliente (nombre, email, celular) VALUES ($1, $2, $3) RETURNING ${COLUMNS}`,
        [name, email, phone]
    );
    return result.rows[0];
};

export const updateCustomer = async (id: number, name: string, email: string, phone: string) => {
    const result = await pool.query(
        `UPDATE cliente SET nombre = $1, email = $2, celular = $3 WHERE id = $4 RETURNING ${COLUMNS}`,
        [name, email, phone, id]
    );
    return result.rows[0] ?? null;
};

