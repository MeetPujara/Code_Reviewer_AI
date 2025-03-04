import express from "express";
import { router } from "./routes/ai.routes.js";
import cors from "cors";

export const app = express();

app.use(
	cors({
		origin: (origin, callback) => {
			const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: "GET,POST,OPTIONS",
		allowedHeaders: "Content-Type,Authorization",
	})
);

app.use(express.json());
app.use("/ai", router);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
