import { Form } from "@/domain/entities/form.entity";
import type { IFormRepository } from "@/application/ports/form-repository.interface";

export class GetFormByIdUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(id: string): Promise<Form | null> {
    return await this.formRepository.findById(id);
  }
}
