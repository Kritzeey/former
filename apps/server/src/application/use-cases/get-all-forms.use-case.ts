import { Form } from "@/domain/entities/form.entity";
import type { IFormRepository } from "@/application/ports/form-repository.interface";

export class GetAllFormsUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(): Promise<Form[]> {
    return await this.formRepository.findAll();
  }
}
