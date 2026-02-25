import { Form } from "@/domain/entities/form.entity";
import type { IFormRepository } from "@/application/ports/form-repository.interface";

export class UpdateFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    id: string,
    newTitle: string,
    newDescription: string,
  ): Promise<Form> {
    const form = await this.formRepository.findById(id);

    if (!form) {
      throw new Error("Form not found");
    }

    form.updateDetails(newTitle, newDescription);

    return await this.formRepository.update(form);
  }
}
