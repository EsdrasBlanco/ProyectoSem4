import { Router } from "express";
import { getSales, getSale, createSale } from "../controllers/sale.controller.js";
import { validateSale } from "../middlewares/validate-sale.js";
import { validatePagination } from "../middlewares/validate-pagination.js";

const router: Router = Router();

router.get("/sales", validatePagination, getSales);
router.get("/sales/:id", getSale);
router.post("/sales", validateSale, createSale);

export default router;