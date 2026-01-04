import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1, fileSize: 10000000 }
});
import { createImage, getImage } from "../controllers/images.js";

router.get("/:id", getImage);

router.post("/", upload.single("image"), createImage);

export default router;
