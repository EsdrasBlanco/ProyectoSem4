import { pool } from "../config/db.js";

const SELECT_SALE = `
    SELECT p.id, p.nombre AS name, p.cantidad AS quantity, p.id_cliente AS "customerId", c.nombre AS "customerName"
    FROM pedido p
    INNER JOIN cliente c ON c.id = p.id_cliente`;

export const getAllSales = async (page: number = 1, limit: number = 10) => {
    const result = await pool.query(`${SELECT_SALE} ORDER BY p.id LIMIT $1 OFFSET $2`, [limit, (page - 1) * limit]);
    const count = await pool.query("SELECT COUNT(*)::int AS total FROM pedido p INNER JOIN cliente c ON c.id = p.id_cliente");
    return { rows: result.rows, total: count.rows[0].total as number };
};

export const getSaleById = async (id: number) => {
    const result = await pool.query(`${SELECT_SALE} WHERE p.id = $1`, [id]);
    return result.rows[0] ?? null;
};

export const insertSale = async (name: string, quantity: number, customerId: number) => {
    const inserted = await pool.query(
        "INSERT INTO pedido (nombre, cantidad, id_cliente) VALUES ($1, $2, $3) RETURNING id",
        [name, quantity, customerId]
    );
    return getSaleById(inserted.rows[0].id);
};

