import { NextFunction, Request, Response } from "express";

export const aysncHandler = (
  fun: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch();
  };
};
