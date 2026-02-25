import { Form } from "@/domain/entities/forms/form.entity";
import type { IFormRepository } from "../../ports/forms/form-repository.interface";
import { randomUUID } from "crypto";

export class CreateFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    userId: string,
    title: string,
    description: string,
  ): Promise<Form> {
    const now = new Date();

    const form = new Form(randomUUID(), userId, title, description, now, now);

    await this.formRepository.save(form);

    return form;
  }
}
