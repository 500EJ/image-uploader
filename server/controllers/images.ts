import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { ImageModel } from "../models/Image.js";
import { unlinkSync } from "fs";

// GET /api/images/:id
export async function getImage(req: Request, res: Response) {
  try {
    const image = await ImageModel.findById(req.params["id"]);
    if (!image) return res.status(404).json({ error: "Image not found" });
    return res.json(image);
  } catch (e) {
    if (e instanceof Error && e.name === "CastError") {
      return res.status(404).json({ error: "Image not found" });
    }
    console.error(e);
    const message = e instanceof Error ? e.message : "Server error";
    return res.status(500).json({ error: message });
  }
}

// POST /api/images
export async function createImage(req: Request, res: Response) {
  if (req.file === undefined) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  if (req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "image/png") {
    unlinkSync(req.file.path);
    return res.status(400).json({ error: "Please upload a JPEG or PNG." });
  }
  if (req.file.size > 10000000) {
    unlinkSync(req.file.path);
    return res.status(400).json({ error: "File must be under 10 megabytes." });
  }
  try {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    const image = await ImageModel.create({ url: secure_url });
    unlinkSync(req.file.path);
    return res.json(image);
  } catch (e) {
    unlinkSync(req.file.path);
    console.error(e);
    const message = e instanceof Error ? e.message : "Server error";
    return res.status(500).json({ error: message });
  }
}
