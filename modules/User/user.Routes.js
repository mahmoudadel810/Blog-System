import { Router } from "express";
const router = Router();
import * as userController from '../User/user.Controller.js'




router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
router.get('/getUserData', userController.getUserData);











export default router;

