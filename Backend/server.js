import { app } from "./src/app.js";
import { configDotenv } from "dotenv";

configDotenv()

app.get('/', (req, res) => {
    res.send('Hello World');
    
})

const PORT = 4000; // Change the port number here

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});