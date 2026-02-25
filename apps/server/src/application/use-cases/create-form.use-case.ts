import { Form } from "@/domain/entities/form-entity";
import type { IFormRepository } from "../ports/form-repository.interface";
import { randomUUID } from "crypto";

export class CreateFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    userId: string,
    title: string,
    description: string,
  ): Promise<Form> {
    const form = new Form(
      randomUUID(),
      userId,
      title,
      description,
      [],
      new Date(),
    );

    await this.formRepository.save(form);

    return form;
  }
}
