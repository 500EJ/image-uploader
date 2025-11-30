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

const app = express();

// middleware
app.use((req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/images", imageRoutes);

if (process.env["NODE_ENV"] === "production") {
  app.use(express.static(join(__dirname, "client/dist")));
  app.get("/{*wild}", (_req, res) =>
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"))
  );
}

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
