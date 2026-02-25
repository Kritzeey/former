import type { Request, Response, NextFunction } from "express";
import { HttpException } from "../../domain/exceptions/http.exception";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({ message: err.message });

    return;
  }

  res.status(500).json({ message: "Internal server error" });
};
