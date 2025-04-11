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

// Get all Employees
export const getAllEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		res.status(200).json(employees);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// (Optional) Get employee by ID
export const getEmployeeById = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.employeeId);
		if (!employee) return res.status(404).json({ error: "Employee not found" });
		res.status(200).json(employee);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// 🔁 Update Coins
export const updateCoins = async (req, res) => {
	const { employeeId } = req.params;
	const { coins } = req.body;

	try {
		const employee = await Employee.findByIdAndUpdate(
			employeeId,
			{ coins },
			{ new: true }
		);
		if (!employee) return res.status(404).json({ error: "Employee not found" });
		res.status(200).json(employee);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// ✅ Submit Report
export const submitReport = async (req, res) => {
	const { adminId, eventId, employeeId } = req.params;
	const { employeeName, report, picture } = req.body;

	try {
		// 🔁 Update Admin's submissions
		const admin = await Admin.findById(adminId);
		if (!admin) return res.status(404).json({ error: "Admin not found" });

		const event = admin.events.id(eventId);
		if (!event) return res.status(404).json({ error: "Event not found" });

		event.submissions.push({
			employeeName,
			report,
			picture,
		});
		await admin.save();

		// 🔁 Update Employee’s event list
		const employee = await Employee.findById(employeeId);
		if (!employee) return res.status(404).json({ error: "Employee not found" });

		employee.events.push({
			eventName: event.eventName,
			eventReport: report,
			eventPicture: picture,
		});

		await employee.save();

		res.status(200).json({ message: "Submission added successfully." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
