import express from "express";
import {
	createAdmin,
	getAllAdmins,
	getAdminById,
	createEvent,
    getEventById,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.get("/:adminId", getAdminById);
router.post("/:adminId/events", createEvent);
router.get("/:adminId/events/:eventId", getEventById)

export default router;
