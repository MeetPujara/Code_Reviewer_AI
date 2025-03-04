import express from "express";
import { router } from "./routes/ai.routes.js";
import cors from "cors";

export const app = express();

app.use(
	cors({
		origin: [
			"https://code-reviewer-ai-rq2w.vercel.app",
			"https://code-reviewer-ai-rq2w-git-main-meetpujaras-projects.vercel.app",
		],
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
