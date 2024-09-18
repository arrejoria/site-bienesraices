import express from 'express'
import { handle404 } from "../controllers/errorController.js"
const router = express.Router()

console.log(router);

router.get('/404', handle404)



export default router