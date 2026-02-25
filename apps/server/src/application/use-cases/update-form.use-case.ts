import { Form } from "@/domain/entities/form.entity";
import type { IFormRepository } from "@/application/ports/form-repository.interface";
import {
  NotFoundException,
  UnauthorizedException,
} from "@/domain/exceptions/http.exception";

export class UpdateFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    id: string,
    userId: string,
    newTitle: string,
    newDescription: string,
  ): Promise<Form> {
    const form = await this.formRepository.findById(id);

    if (!form) {
      throw new NotFoundException("Form not found");
    }

    if (form.userId !== userId) {
      throw new UnauthorizedException("You can only update your own forms");
    }

    form.updateDetails(newTitle, newDescription);

    return await this.formRepository.update(form);
  }
}
