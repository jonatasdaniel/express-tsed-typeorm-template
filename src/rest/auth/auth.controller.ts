import { AuthService, UserWithToken } from "@app/auth/auth.service";
import UserRepository from "@domain/user/user.repository";
import { Controller, Inject } from "@tsed/di";
import { Unauthorized } from "@tsed/exceptions";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import UserPgRepository from "src/infra/db/repositories/user.pg.repository";
import SignInDto from "src/rest/auth/dtos/sign-in.dto";
import User from "@domain/user/user.entity";
import { BasicAuth, CurrentUser } from "./decorators";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserPgRepository) private readonly userRepository: UserRepository
  ) {}

  @Post("/signin")
  async signIn(@BodyParams() { email, password }: SignInDto) {
    const userWithToken: UserWithToken | null = await this.authService.signIn(
      email,
      password
    );
    if (!userWithToken) {
      throw new Unauthorized("unautorized");
    }
    return userWithToken;
  }

  @Get("/account")
  @BasicAuth()
  async account(@CurrentUser() user: User) {
    console.log("current user", user);
    return user;
  }
}
