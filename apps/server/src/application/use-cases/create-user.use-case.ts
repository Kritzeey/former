import { User } from "@/domain/entities/user.entity";
import type { IPasswordHasher } from "@/application/ports/password-hasher.interface";
import type { IUserRepository } from "@/application/ports/user-repository.interface";
import { randomUUID } from "crypto";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    username: string,
    plainTextPassword: string,
  ): Promise<Omit<User, "password">> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new Error("Username is already registered");
    }

    const hashedPassword = await this.passwordHasher.hash(plainTextPassword);

    const user = new User(randomUUID(), username, hashedPassword, new Date());

    await this.userRepository.save(user);

    const { password, ...result } = user;

    return result;
  }
}
