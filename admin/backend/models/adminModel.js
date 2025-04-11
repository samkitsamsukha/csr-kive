import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
	orgName: String,
	vision: String,
	logo: String,
	mission: String,
	events: [
		{
			eventName: String,	
			eventDate: Date,
			eventLocation: String,
			eventDescription: String,
			eventImage: String,
			rewardAmount: Number,
			eventSummary: { type: String, default: "" },
			submissions: [
				{
					employeeId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'Employee'
					},
					employeeName: String,
					report: String,
					picture: String,
				},
			],
		},
	],
});

const Admin = mongoose.model("Admin", adminSchema);
export { Admin };

