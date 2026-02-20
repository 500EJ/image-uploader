import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
if (
  !process.env["CLOUDINARY_NAME"] ||
  !process.env["CLOUDINARY_KEY"] ||
  !process.env["CLOUDINARY_SECRET"]
)
  throw new Error("Cloudinary config missing");
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env["CLOUDINARY_NAME"],
  api_key: process.env["CLOUDINARY_KEY"],
  api_secret: process.env["CLOUDINARY_SECRET"],
  secure: true
});
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import imageRoutes from "./routes/images.js";
import logger from "./middleware/logger.ts";
import errorHandler from "./middleware/errorHandler.js";
import { rateLimit } from "express-rate-limit";
const clientLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  message: "Too many requests",
  standardHeaders: true,
  legacyHeaders: false
});
const imageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

const app = express();

// middleware
app.use(logger);

// routes
app.use("/api/images", imageLimiter, imageRoutes);

if (process.env["NODE_ENV"] === "production") {
  app.use(express.static(join(__dirname, "client/dist")));
  app.get("/{*wild}", clientLimiter, (_req, res) =>
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"))
  );
}

// errors
app.use(errorHandler);

if (typeof process.env["MONGO_URI"] !== "string") {
  throw new Error("Missing MONGO_URI");
}
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env["MONGO_URI"])
  .then(() =>
    app.listen(process.env["PORT"], () =>
      console.log(`Listening on port ${process.env["PORT"]}`)
    )
  )
  .catch(error => console.error(error));
