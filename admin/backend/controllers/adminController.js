import { Admin } from "../models/adminModel.js";

// Create a new Admin
export const createAdmin = async (req, res) => {
	try {
		const newAdmin = await Admin.create(req.body);
		res.status(201).json(newAdmin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all Admins
export const getAllAdmins = async (req, res) => {
	try {
		const admins = await Admin.find();
		res.status(200).json(admins);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// (Optional) Get single admin by ID
export const getAdminById = async (req, res) => {
	try {
		const admin = await Admin.findById(req.params.adminId);
		if (!admin) return res.status(404).json({ error: "Admin not found" });
		res.status(200).json(admin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add an event to an existing Admin
export const createEvent = async (req, res) => {
	const { adminId } = req.params;
	const {
		eventName,
		eventDate,
		eventLocation,
		eventDescription,
		eventImage,
		rewardAmount,
	} = req.body;

	try {
		const admin = await Admin.findById(adminId);
		if (!admin) return res.status(404).json({ error: "Admin not found" });

		const newEvent = {
			eventName,
			eventDate,
			eventLocation,
			eventDescription,
			eventImage,
			rewardAmount,
		};

		admin.events.push(newEvent);
		await admin.save();

		res.status(201).json({ message: "Event created", event: newEvent });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getEventById = async (req, res) => {
	try {
		const admin = await Admin.findById(req.params.adminId);
		if (!admin) return res.status(404).json({ error: "Admin not found" });

		const event = admin.events.id(req.params.eventId);
		if (!event) return res.status(404).json({ error: "Event not found" });

		res.status(200).json(event);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}