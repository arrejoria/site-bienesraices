import express from 'express'
import { loginForm, authenticateUser, registerForm, registerUser,confirmUser, passwordLost, recoverUserPassword, checkUserToken, newPassword } from '../controllers/userController.js';
//crear app
const router = express.Router();

// Routing
router.get('/login', loginForm)
router.post('/login', authenticateUser)

router.get('/registro', registerForm)
router.post('/registro', registerUser)

router.get('/confirmacion/:token', confirmUser)

router.get('/recuperar-password', passwordLost)
router.post('/recuperar-password', recoverUserPassword)

router.get('/recuperar-password/:token', checkUserToken)
router.post('/recuperar-password/:token', newPassword)



export default router;