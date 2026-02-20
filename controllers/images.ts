import type { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { ImageModel } from "../models/Image.js";

// GET /api/images/:id
export async function getImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const image = await ImageModel.findById(req.params["id"]);
    if (!image) return res.status(404).json({ error: "Image not found" });
    return res.json(image);
  } catch (err) {
    return next(err);
  }
}

// POST /api/images
export async function createImage(req: Request, res: Response) {
  if (req.file === undefined) {
    return res.status(400).json({ error: "Upload a file under 10 megabytes." });
  }
  const mimetypes = [
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/heif",
    "image/tiff",
    "image/webp"
  ];
  if (!mimetypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: "Accepted Formats: JPEG, PNG, HEIC, HEIF, TIFF, and WEBP"
    });
  }
  if (req.file.size > 10000000) {
    return res.status(400).json({ error: "File must be under 10 megabytes." });
  }

  try {
    const buffer = req.file.buffer;
    const obj = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        })
        .end(buffer);
    });
    if (
      !obj ||
      typeof obj !== "object" ||
      !("secure_url" in obj) ||
      typeof obj.secure_url !== "string"
    ) {
      return res.status(500).json({ error: "Server error" });
    }

    const image = await ImageModel.create({ url: obj.secure_url });
    return res.json(image);
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Server error";
    return res.status(500).json({ error: message });
  }
}
