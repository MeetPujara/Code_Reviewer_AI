import express from "express";
import { router } from "./routes/ai.routes.js";
import cors from "cors";

export const app = express();


app.use(
	cors({
		origin: "https://code-reviewer-ai-frontend.vercel.app/", // Replace with your frontend domain
		methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Working")
})

app.use("/ai", router);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
