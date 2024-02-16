import { Router } from "express";
import { CourseController, getCourseByIdController, homeController } from "../controller/courses.controller";

const router=Router();



router.post("/courses",CourseController);
router.get('/courses',homeController);
router.get('/courses/:course_id',getCourseByIdController)

export default router;