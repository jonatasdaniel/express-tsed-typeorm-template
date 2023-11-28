import User from "@domain/user/user.entity";
import UserRepository from "@domain/user/user.repository";
import { Inject, Injectable } from "@tsed/di";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserPgRepository from "src/infra/db/repositories/user.pg.repository";

const JWT_SECRET = process.env.JWT_SECRET || "";

export interface UserWithToken {
  email: string;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserPgRepository) private readonly userRepository: UserRepository
  ) {}

  async signIn(email: string, password: string): Promise<UserWithToken | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    if (!this.passwordIsValid(user.encryptedPassword, password)) {
      return null;
    }
    const token = await this.generateToken(user);
    return {
      email: user.email,
      token,
    };
  }

  async userFromToken(token: string): Promise<User | null> {
    const userWithToken = await this.verifyToken(token);
    if (!userWithToken) {
      return null;
    }
    const user = await this.userRepository.findByEmail(userWithToken.email);
    return user;
  }

  async verifyToken(token: string): Promise<UserWithToken | null> {
    let payload = null;
    try {
      payload = jsonwebtoken.verify(token, JWT_SECRET);
      console.log("payload", payload);
    } catch (e) {
      return null;
    }
    if (!payload) {
      return null;
    }
    const email = typeof payload !== "string" && payload.email;
    return {
      email,
      token,
    };
  }

  async generateToken(user: User): Promise<string> {
    return jsonwebtoken.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "60m",
    });
  }

  async passwordIsValid(
    encryptedPassword: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}
