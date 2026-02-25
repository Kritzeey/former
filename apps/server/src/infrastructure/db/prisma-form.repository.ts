import prisma from "@former/db";
import type { IFormRepository } from "../../application/ports/form-repository.interface";
import { Form } from "@/domain/entities/form.entity";
import type { Form as PrismaForm } from "../../../../../packages/db/prisma/generated/client";

export class PrismaFormRepository implements IFormRepository {
  private mapToDomain(record: PrismaForm): Form {
    return new Form(
      record.id,
      record.userId,
      record.title,
      record.description,
      record.createdAt,
      record.updatedAt,
    );
  }

  async save(form: Form): Promise<void> {
    await prisma.form.create({
      data: {
        id: form.id,
        userId: form.userId,
        title: form.title,
        description: form.description,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      },
    });
  }

  async findAll(): Promise<Form[]> {
    const records = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
    });

    return records.map((record) => this.mapToDomain(record));
  }

  async findById(id: string): Promise<Form | null> {
    const record = await prisma.form.findUnique({
      where: { id },
    });

    if (!record) return null;

    return this.mapToDomain(record);
  }

  async findByUserId(userId: string): Promise<Form[]> {
    const records = await prisma.form.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return records.map((record) => this.mapToDomain(record));
  }

  async update(form: Form): Promise<Form> {
    const record = await prisma.form.update({
      where: { id: form.id },
      data: {
        title: form.title,
        description: form.description,
        updatedAt: form.updatedAt,
      },
    });

    return this.mapToDomain(record);
  }

  async delete(id: string): Promise<Form> {
    const record = await prisma.form.delete({
      where: { id },
    });

    return this.mapToDomain(record);
  }
}
