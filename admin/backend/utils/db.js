import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://samkitsamsukhais23:samkit@reelspro.z0tlf.mongodb.net/?retryWrites=true&w=majority&appName=reelspro", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;