import type { ITokenGenerator } from "@/application/ports/token-generator.interface";
import jwt from "jsonwebtoken";

export class TokenGenerator implements ITokenGenerator {
  private JWT_SECRET = process.env.JWT_SECRET!;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "24h" });
  }
}
