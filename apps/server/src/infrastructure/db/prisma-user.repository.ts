import type { IUserRepository } from "@/application/ports/user-repository.interface";
import { User } from "@/domain/entities/user.entity";
import prisma from "@former/db";

export class PrismaUserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    return new User(user.id, user.username, user.password, user.createdAt);
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
