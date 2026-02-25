import { Form } from "@/domain/entities/forms/form.entity";
import type { IFormRepository } from "@/application/ports/forms/form-repository.interface";

export class GetUserFormsUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(userId: string): Promise<Form[]> {
    return await this.formRepository.findByUserId(userId);
  }
}
