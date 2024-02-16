import { Router } from "express";
import { auth, isStudent, isTutor } from "../middleware/auth";
import { addComment, getComment } from "../controller/chat.controller";
import { addCommunityController, getCommunityController } from "../controller/community.controller";
const router=Router();

router.get('/chats',auth,isStudent,getComment);
router.post('/chats',auth,isStudent,addComment);


router.get("/communities",getCommunityController);
router.put("/communities",addCommunityController)

export default router;







