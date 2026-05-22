import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { stat } from "node:fs";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  console.log("Unexpected Error : ", err);

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};
