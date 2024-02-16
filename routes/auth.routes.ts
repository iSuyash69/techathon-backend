import { Router } from "express";
import getController from "../controller/getController";

import loginController from "../controller/login.controller";
import signupController from "../controller/signup.controller";
import { auth } from "../middleware/auth";

const router=Router();



router.get('/get',auth,getController);
router.post('/login',loginController);
router.post('/signup',signupController);



export default router; 