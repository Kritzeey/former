import { Router } from "express";
import { AuthController } from "@/presentation/controllers/auth.controller";
import { PrismaUserRepository } from "@/infrastructure/db/prisma-user.repository";
import { BcryptPasswordHasher } from "@/infrastructure/security/password-hasher";
import { TokenGenerator } from "@/infrastructure/security/token-generator";
import { CreateUserUseCase } from "@/application/use-cases/users/create-user.use-case";
import { LogInUseCase } from "@/application/use-cases/auth/log-in.use-case";

const router = Router();

const userRepository = new PrismaUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenGenerator = new TokenGenerator();

const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
const logInUseCase = new LogInUseCase(
  userRepository,
  passwordHasher,
  tokenGenerator,
);

const authController = new AuthController(createUserUseCase, logInUseCase);

router.post("/sign-up", (req, res) => authController.signup(req, res));
router.post("/log-in", (req, res) => authController.login(req, res));

export default router;
