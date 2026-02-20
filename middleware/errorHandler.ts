import type { NextFunction, Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (process.env["NODE_ENV"] === "development") {
    console.error(err);
  } else if (process.env["NODE_ENV"] === "production") {
    const directory = path.resolve(import.meta.dirname, "..", "logs");
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    fs.appendFileSync(
      path.resolve(directory, "errLog.log"),
      `${new Date().toISOString()} - ${req.method} ${req.url} ${req.headers.origin}\n${err}\n\n`
    );
  }

  let [statusCode, message] = [500, "Internal server error"];
  if (err && typeof err === "object") {
    if ("statusCode" in err && typeof err.statusCode === "number") {
      statusCode = err.statusCode;
    }
    if ("message" in err && typeof err.message === "string" && err.message) {
      message = err.message;
    }
    if ("name" in err) {
      if (err.name === "MulterError") {
        statusCode = 400;
      } else if (err.name === "CastError") {
        statusCode = 404;
        message = "Image not found";
      }
    }
  }
  return res.status(statusCode).json({ error: message });
}
