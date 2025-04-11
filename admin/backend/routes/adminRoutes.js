import express from "express";
import { createAdmin, addEvent, updateEvent } from "../controllers/adminController.js";

const router = express.Router();

router.post("/", createAdmin);
router.post("/:adminId/events", addEvent);
router.put("/:adminId/events/:eventId", updateEvent);

export default router;
