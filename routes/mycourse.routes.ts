import { Router } from "express";
import { addmycourse, mycourse } from "../controller/mycourse.controller";
import { auth } from "../middleware/auth";

const router=Router();

router.get('/myCourses',auth,mycourse);
router.post('/myCourses',auth,addmycourse);

export default router;