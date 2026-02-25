import type { ITokenGenerator } from "@/application/ports/auth/token-generator.interface";
import { env } from "@former/env/server";
import jwt from "jsonwebtoken";

export class TokenGenerator implements ITokenGenerator {
  generateToken(payload: any): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "24h" });
  }
}
