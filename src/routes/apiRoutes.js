import express from 'express'
import { verifyID } from '../middleware/idVerification.js'
import path from 'path'
import { fileURLToPath } from 'url' 
import multer from "multer"

const upload = multer({dest: "../../uploads"})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const router = express.Router()

router.post('/verify-id', upload.single('id'), async (req, res) => {
    console.log('API /verify-id called')
    console.log(req.file) // Log file info
    await verifyID(req, res)
})



export default router