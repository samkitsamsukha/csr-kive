import { Admin } from "../models/adminModel.js";

export const createAdmin = async (req, res) => {
	try {
		const newAdmin = await Admin.create(req.body);
		res.status(201).json(newAdmin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const addEvent = async (req, res) => {
	const { adminId } = req.params;
	const eventData = req.body;
	try {
		const admin = await Admin.findById(adminId);
		admin.event.push(eventData);
		await admin.save();
		res.status(200).json(admin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateEvent = async (req, res) => {
	const { adminId, eventId } = req.params;
	const updateData = req.body;
	try {
		const admin = await Admin.findById(adminId);
		const event = admin.event.id(eventId);
		Object.assign(event, updateData);
		await admin.save();
		res.status(200).json(event);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
