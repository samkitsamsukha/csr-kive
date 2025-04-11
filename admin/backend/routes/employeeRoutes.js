import express from "express";
import { createEmployee, updateCoins, submitReport } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.put("/:employeeId/coins", updateCoins);
router.post("/:adminId/events/:eventId/submit/:employeeId", submitReport);

export default router;
