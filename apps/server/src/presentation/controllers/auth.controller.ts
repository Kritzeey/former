import type { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/create-user.use-case";
import { LogInUseCase } from "@/application/use-cases/log-in.use-case";

export class AuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private logInUseCase: LogInUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }

      const user = await this.createUserUseCase.execute(username, password);

      res.status(201).json({
        message: "Sign up successful",
        user,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }

      const token = await this.logInUseCase.execute(username, password);

      res.status(200).json({
        message: "Log in successful",
        token,
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
