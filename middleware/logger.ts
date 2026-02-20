import type { Request, Response, NextFunction } from "express";
import path from "node:path";
import fs from "node:fs";

export default function logger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (process.env["NODE_ENV"] === "development") {
    console.log(`${req.method} ${req.url} ${req.headers.origin}`);
  } else if (process.env["NODE_ENV"] === "production") {
    const directory = path.resolve(import.meta.dirname, "..", "logs");
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    fs.appendFileSync(
      path.resolve(directory, "reqLog.log"),
      `${new Date().toISOString()} - ${req.method} ${req.url} ${req.headers.origin}\n`
    );
  }
  next();
}
