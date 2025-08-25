import express from 'express'
import cors from 'cors'
import authRoutes from '../src/routes/authRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

//lets server server all files in public folder
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8848

//ROUTES
app.use('/', authRoutes)

//server start
app.listen(PORT, ()=>{
     console.log(`server started on PORT: ${PORT}`)
})