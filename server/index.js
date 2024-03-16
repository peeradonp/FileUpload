import cors from 'cors'
import express, { json } from 'express'
import rateLimit from 'express-rate-limit'
import router from './src/routes/upload/index.js'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 8080
const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(cors())
app.use(json())

app.use(limiter)

app.use('/', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

export default app
