import { Employee } from "../models/employeeModel.js";
import { Admin } from "../models/adminModel.js";

export const createEmployee = async (req, res) => {
	try {
		const newEmp = await Employee.create(req.body);
		res.status(201).json(newEmp);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateCoins = async (req, res) => {
	const { employeeId } = req.params;
	const { coins } = req.body;
	try {
		const emp = await Employee.findByIdAndUpdate(employeeId, { coins }, { new: true });
		res.status(200).json(emp);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const submitReport = async (req, res) => {
	const { adminId, eventId, employeeId } = req.params;
	const { report, picture } = req.body;

	try {
		// Update in Admin
		const admin = await Admin.findById(adminId);
		const event = admin.event.id(eventId);
		event.submissions.push({
			employeeName: req.body.employeeName,
			report,
			picture,
		});
		await admin.save();

		// Update in Employee
		const employee = await Employee.findById(employeeId);
		employee.events.push({
			eventName: event.eventName,
			eventReport: report,
			eventPicture: picture,
		});
		await employee.save();

		res.status(200).json({ message: "Submission added" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
