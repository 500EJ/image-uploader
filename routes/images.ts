import { Router } from "express";
const router = Router();
import { dirname } from "node:path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import multer from "multer";
const upload = multer({ dest: __dirname + "/../uploads" });
import { createImage, getImage } from "../controllers/images.js";

router.get("/:id", getImage);

router.post("/", upload.single("image"), createImage);

export default router;
