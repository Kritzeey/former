import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await this.createUserUseCase.execute(email, password);

      res.status(201).json({
        message: "User created successfully",
        userId: user.id,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
