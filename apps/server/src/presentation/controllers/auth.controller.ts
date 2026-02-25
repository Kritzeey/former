import type { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/users/create-user.use-case";
import { LogInUseCase } from "@/application/use-cases/auth/log-in.use-case";
import { BadRequestException } from "@/domain/exceptions/http.exception";

export class AuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private logInUseCase: LogInUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestException("Username and password are required.");
    }

    const user = await this.createUserUseCase.execute(username, password);

    res.status(201).json({
      message: "Sign up successful.",
      user,
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestException("Username and password are required.");
    }

    const token = await this.logInUseCase.execute(username, password);

    res.status(200).json({
      message: "Log in successful.",
      token,
    });
  }
}
