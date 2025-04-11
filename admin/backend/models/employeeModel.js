import mongoose from "mongoose";

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
	events: [
		{
			eventId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Admin.events', // or simply 'Event' if it's its own model
			},
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
		}
	]
});

const Employee = mongoose.model("Employee", employeeSchema);
export { Employee };
