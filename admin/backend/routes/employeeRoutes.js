import express from "express";
import {
	createEmployee,
	getAllEmployees,
	getEmployeeById,
	updateCoins,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:employeeId", getEmployeeById);

// ✅ Update coins
router.put("/:employeeId/coins", updateCoins);

// ✅ Submit report to an event
// Assuming you're using Express

export default router;
