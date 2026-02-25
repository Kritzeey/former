import { Router } from "express";
import { UserController } from "@/presentation/controllers/user.controller";
import { PrismaUserRepository } from "@/infrastructure/db/prisma-user.repository";
import { BcryptPasswordHasher } from "@/infrastructure/security/password-hasher";
import { CreateUserUseCase } from "@/application/use-cases/create-user.use-case";

const router = Router();

const userRepository = new PrismaUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
const userController = new UserController(createUserUseCase);

router.post("/", (req, res) => userController.register(req, res));

export default router;
