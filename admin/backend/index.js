import express from "express";
import connectDB from "./utils/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "*",
	})
);

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
