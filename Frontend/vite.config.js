import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
	server: {
		proxy: {
			"/api": {
				target: "http://your-backend-domain.com", // Backend URL
				changeOrigin: true,
				secure: false,
			},
		},
	},
};

