import type { IUserRepository } from "@/application/ports/user/user-repository.interface";
import { User } from "@/domain/entities/users/user.entity";
import prisma from "@former/db";
import type { User as PrismaUser } from "../../../../../packages/db/prisma/generated/client";

export class PrismaUserRepository implements IUserRepository {
  private mapToDomain(record: PrismaUser): User {
    return new User(
      record.id,
      record.username,
      record.password,
      record.createdAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { username } });

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
      },
    });
  }
}
