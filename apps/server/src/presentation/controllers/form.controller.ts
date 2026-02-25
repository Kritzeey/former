import type { Request, Response } from "express";
import { CreateFormUseCase } from "@/application/use-cases/create-form.use-case";
import { GetAllFormsUseCase } from "@/application/use-cases/get-all-forms.use-case";
import { GetFormByIdUseCase } from "@/application/use-cases/get-form-by-id.use-case";
import { GetUserFormsUseCase } from "@/application/use-cases/get-user-forms.use-case";
import { UpdateFormUseCase } from "@/application/use-cases/update-form.use-case";
import { DeleteFormUseCase } from "@/application/use-cases/delete-form.use-case";
import {
  BadRequestException,
  NotFoundException,
} from "@/domain/exceptions/http.exception";

export class FormController {
  constructor(
    private createFormUseCase: CreateFormUseCase,
    private getAllFormsUseCase: GetAllFormsUseCase,
    private getFormByIdUseCase: GetFormByIdUseCase,
    private getUserFormsUseCase: GetUserFormsUseCase,
    private updateFormUseCase: UpdateFormUseCase,
    private deleteFormUseCase: DeleteFormUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const { userId, title, description } = req.body;

    if (!userId || !title || !description) {
      throw new BadRequestException(
        "userId, title, and description are required.",
      );
    }

    const form = await this.createFormUseCase.execute(
      userId,
      title,
      description,
    );

    res.status(201).json({ message: "Form created successfully.", form });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const forms = await this.getAllFormsUseCase.execute();

    res.status(200).json({ message: "Forms fetched successfully", forms });
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const form = await this.getFormByIdUseCase.execute(req.params.id);

    if (!form) {
      throw new NotFoundException("Form not found");
    }

    res.status(200).json({ message: "Form fetched successfully", form });
  }

  async getByUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    const forms = await this.getUserFormsUseCase.execute(req.params.id);

    res.status(200).json({ message: "Forms fetched successfully", forms });
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<void> {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new BadRequestException("Title and description are required.");
    }

    const form = await this.updateFormUseCase.execute(
      req.params.id,
      title,
      description,
    );

    res.status(200).json(form);
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    await this.deleteFormUseCase.execute(req.params.id);

    res.status(204).json({ message: "Form deleted successfully." });
  }
}
