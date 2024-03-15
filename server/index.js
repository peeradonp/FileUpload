import cors from 'cors'
import express, { json } from 'express'
import router from './src/routes/upload/index.js'

const port = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(json())

app.use('/', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

export default app
