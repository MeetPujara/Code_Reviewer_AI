import express from "express";
import { router } from "./routes/ai.routes.js";
import cors from "cors";

export const app = express();

const allowedOrigins = [
	"https://code-reviewer-ai-frontend.vercel.app/",
	"https://code-reviewer-ai-backend-pi.vercel.app",
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ["GET", "POST"],
		credentials: true,
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.json("Backend Working!");
});

app.use("/ai", router);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
