import { Router } from "express";
import { FormController } from "@/presentation/controllers/form.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

import { PrismaFormRepository } from "@/infrastructure/db/prisma-form.repository";
import { CreateFormUseCase } from "@/application/use-cases/create-form.use-case";
import { GetAllFormsUseCase } from "@/application/use-cases/get-all-forms.use-case";
import { GetFormByIdUseCase } from "@/application/use-cases/get-form-by-id.use-case";
import { GetUserFormsUseCase } from "@/application/use-cases/get-user-forms.use-case";
import { UpdateFormUseCase } from "@/application/use-cases/update-form.use-case";
import { DeleteFormUseCase } from "@/application/use-cases/delete-form.use-case";

const router = Router();

const formRepository = new PrismaFormRepository();

const formController = new FormController(
  new CreateFormUseCase(formRepository),
  new GetAllFormsUseCase(formRepository),
  new GetFormByIdUseCase(formRepository),
  new GetUserFormsUseCase(formRepository),
  new UpdateFormUseCase(formRepository),
  new DeleteFormUseCase(formRepository),
);

router.get("/:id", (req, res) => formController.getById(req, res));
router.get("/", (req, res) => formController.getAll(req, res));
router.get("/user/:id", (req, res) => formController.getByUserId(req, res));

router.post("/", authMiddleware, (req, res) => formController.create(req, res));
router.put("/:id", authMiddleware, (req, res) =>
  formController.update(req, res),
);
router.delete("/:id", authMiddleware, (req, res) =>
  formController.delete(req, res),
);

export default router;
