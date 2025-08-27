import express from 'express'
import { verifyID } from '../middleware/idVerification.js'
import path from 'path'
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const router = express.Router()

router.post('/verify-id', verifyID)



export default router