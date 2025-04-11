import express from "express";
import {
	createEmployee,
	getAllEmployees,
	getEmployeeById,
	updateCoins,
	submitReport,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:employeeId", getEmployeeById);

// ✅ Update coins
router.put("/:employeeId/coins", updateCoins);

// ✅ Submit report to an event
// Assuming you're using Express
router.post("/:adminId/events/:eventId/submit/:employeeId", submitReport);

export default router;
