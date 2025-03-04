import express from "express";
import { router } from "./routes/ai.routes.js";
import cors from "cors";

export const app = express();

const corsOptions = {
	origin: [""],
	methods: ["POST","GET"],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Working")
})
app.use("/ai", router);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
