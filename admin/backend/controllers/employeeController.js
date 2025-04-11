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
  
	// You can log it to check
	console.log('Params:', req.params);
	console.log('Body:', req.body);
  
	try {
	  // Save to DB (dummy example)
	  const saved = {
		adminId,
		eventId,
		employeeId,
		employeeName,
		report,
		picture,
	  };
  
	  res.status(201).json({ message: "Report submitted!", data: saved });
	} catch (error) {
	  res.status(500).json({ error: "Submission failed." });
	}
  };
  