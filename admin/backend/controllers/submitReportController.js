import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";

export const submitReport = async (req, res) => {
  console.log("Submit endpoint hit");

  const { adminId, eventId } = req.params;
  const { employeeId, employeeName, report, picture } = req.body;

  try {
    // Find the admin by ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the event by ID in the admin's events array
    const event = admin.events.id(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the submission to the event
    event.submissions.push({
      employeeId,
      employeeName,
      report,
      picture,
    });

    await admin.save();

    // Update the employee's participation and coins
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.events.push({
      eventId,
      eventName: event.eventName,
      eventReport: report,
      eventPicture: picture,
    });

    employee.coins += event.rewardAmount;

    await employee.save();

    res.status(200).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Failed to submit report", error });
  }
};
