import { Router } from "express";
import { getCustomers, getCustomer, createCustomer, updateCustomer } from "../controllers/customer.controller.js";
import { validateCustomer } from "../middlewares/validate-customer.js";
import { validatePagination } from "../middlewares/validate-pagination.js";

const router: Router = Router();

router.get("/customers", validatePagination, getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomer, createCustomer);
router.put("/customers/:id", validateCustomer, updateCustomer);

export default router;

