import express from 'express'
import { router } from './routes/ai.routes.js'
import cors from 'cors'

export const app = express()

app.use(cors())

app.use(express.json())
app.use('/ai',router)