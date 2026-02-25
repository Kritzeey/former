import type { IFormRepository } from "@/application/ports/form-repository.interface";

export class DeleteFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(id: string): Promise<void> {
    await this.formRepository.delete(id);
  }
}
