import express from 'express'
import { loginForm, registerForm, passwordLost } from '../controllers/userController.js';
//crear app
const router = express.Router();

// Routing
router.get('/login', loginForm)
router.get('/registro', registerForm)
router.get('/recuperar-password', passwordLost)


export default router;