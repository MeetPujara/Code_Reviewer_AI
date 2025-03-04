import { generateContent } from "../services/ai.services.js";

export const getReview = async (req, res) => {
	const code = req.body.code;

	if (!code) {
		return res.status(400).send("Code is Required");
	}

	try {
		const response = await generateContent(code);
		res.send(response);
	} catch (error) {
		res.status(500).send("Error generating content");
	}
};
