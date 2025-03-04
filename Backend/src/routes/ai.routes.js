import express from 'express'
import { getReview } from "../controllers/ai.controllers.js";
import {limiter} from '../middleware/ai.rateLimiter.js';

export const router = express.Router()

router.post('/get-review',limiter,getReview)
    