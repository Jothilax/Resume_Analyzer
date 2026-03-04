import express from "express";
import upload from "../utils/upload.js";
import { uploadResume } from "../controllers/resumecontroller.js";

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

export default router;