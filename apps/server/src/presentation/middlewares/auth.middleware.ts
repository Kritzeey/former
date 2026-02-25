import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../../domain/exceptions/http.exception";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedException("Invalid token.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("Invalid token.");
  }

  try {
    const secret = process.env.JWT_SECRET || "super_secret_fallback_key";

    const payload = jwt.verify(token, secret);

    req.user = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    throw new UnauthorizedException("Invalid token.");
  }
};
