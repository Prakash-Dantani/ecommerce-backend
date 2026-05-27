import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { apiResponse } from "../utils/apiResponse";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(apiResponse(false, err.message));
  }

  console.log("Unexpected Error : ", err);

  return res.status(500).json(apiResponse(false, "Internal Server Error"));
};
