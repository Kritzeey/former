import { User } from "@/domain/entities/users/user.entity";
import type { IPasswordHasher } from "@/application/ports/auth/password-hasher.interface";
import type { IUserRepository } from "@/application/ports/user/user-repository.interface";
import { randomUUID } from "crypto";
import { BadRequestException } from "@/domain/exceptions/http.exception";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    username: string,
    plainPassword: string,
  ): Promise<Omit<User, "password">> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new BadRequestException("Username is already registered");
    }

    const hashedPassword = await this.passwordHasher.hash(plainPassword);

    const user = new User(randomUUID(), username, hashedPassword, new Date());

    await this.userRepository.save(user);

    const { password, ...result } = user;

    return result;
  }
}
