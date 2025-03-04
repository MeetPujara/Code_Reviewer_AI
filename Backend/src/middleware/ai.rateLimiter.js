import rateLimit from "express-rate-limit";

// Define rate limiting rules
export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 5, // limit each IP to requests per windowMs
	message: "Too many requests from this IP, please try again after a minute",
});



// windowMs: A parameter from express-rate-limit that defines the duration of the rate limiting window in milliseconds.

// Each IP address can make up to max requests within a 1-minute window.
// After 1 minute, the rate limit will reset, and the IP address can make another 15 requests.