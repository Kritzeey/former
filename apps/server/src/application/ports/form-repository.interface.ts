import { Form } from "@/domain/entities/form-entity";

export interface IFormRepository {
  save(form: Form): Promise<Form>;
  findById(id: string): Promise<Form | null>;
  findByUserId(userid: string): Promise<Form[]>;
}
