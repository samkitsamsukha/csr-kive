import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
	orgName: {
		type: String,
		required: true,
	},
	vision: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: true,
	},
	mission: {
		type: String,
		required: true,
	},
	event: {
		type: [
			{
				eventName: {
					type: String,
					required: true,
				},
				eventDate: {
					type: Date,
					required: true,
				},
				eventLocation: {
					type: String,
					required: true,
				},
				eventDescription: {
					type: String,
					required: true,
				},
				eventImage: {
					type: String,
					required: true,
				},
				rewardAmount: {
					type: Number,
					required: true,
				},
				submissions: {
					type: [
						{
							employeeName: {
								type: String,
								required: true,
							},
							report: {
								type: String,
								required: true,
							},
							picture: {
								type: String,
								required: true,
							},
						},
					],
				},
			},
		],
	},
});

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	coins: {
		type: Number,
		required: true,
	},
	events: {
		type: [
			{
				eventName: {
					type: String,
					required: true,
				},
				eventReport: {
					type: String,
					required: true,
				},
				eventPicture: {
					type: String,
					required: true,
				}
			},
		],
	},
});

const Employee = mongoose.model("Employee", employeeSchema);
const Admin = mongoose.model("Admin", adminSchema);

export { Employee, Admin };