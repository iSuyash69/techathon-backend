import { Router } from "express";
import { fileUploadController, imageUploadController, localFileUploadController, videoUploadController } from "../controller/fileUpload.controller";
import { transcriptionController } from "../controller/transcription.controller";
import {  subtitle, subtitleController } from "../controller/subtitle.controller";
import { createModuleController, moduleController } from "../controller/module.controller";

const router=Router();



router.post('/fileupload',fileUploadController);
router.post('/videoUpload',videoUploadController);
router.post('/imageUpload',imageUploadController);
router.post('/localFileUpload',localFileUploadController);
router.post('/uploadModule',createModuleController)

router.get("/transcription",transcriptionController);


router.post('/subtitles',subtitleController);

router.post('/subtitle',subtitle);


export default router;