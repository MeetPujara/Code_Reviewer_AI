import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	// server: {
	// 	proxy: {
	// 		"/ai": {
	// 			target: "https://code-reviewer-ai-backend-pi.vercel.app",
	// 			changeOrigin: true,
	// 			secure: true,
	// 		},
	// 	},
	// },
});
