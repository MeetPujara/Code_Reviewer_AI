import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
	server: {
		proxy: {
			"/api": {
				target: "https://code-reviewer-ai-backend-pi.vercel.app", // Backend URL
				changeOrigin: true,
				secure: false,
			},
		},
	},
};

