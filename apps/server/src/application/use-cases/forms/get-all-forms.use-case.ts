import { Form } from "@/domain/entities/forms/form.entity";
import type { IFormRepository } from "@/application/ports/forms/form-repository.interface";

export class GetAllFormsUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(): Promise<Form[]> {
    return await this.formRepository.findAll();
  }
}
