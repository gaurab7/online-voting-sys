import express from 'express'
import { login_limiter, reg_limiter, logout_limiter } from '../middleware/rate-limiter.js'
import path from 'path'
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const router = express.Router()

router.get('/', (req, res)=>{
    //get out of routes then out of src to get to public
    res.sendFile(path.join(__dirname, '../../public/login.html'))
})

//registration
router.post('/register', reg_limiter)

//login
router.post('/login', login_limiter)
//logout
router.post('/logout', logout_limiter)

export default router