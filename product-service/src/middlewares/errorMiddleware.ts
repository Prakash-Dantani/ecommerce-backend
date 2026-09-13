import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError";
import { apiResponse } from "../utils/apiResponse";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(apiResponse(false, err.message));
  }

  console.log(`Unexpected Error Occur : ${err}`);
  return res
    .status(500)
    .json(apiResponse(false, err.message ?? "Internal Server Error"));
};

export default errorMiddleware;
