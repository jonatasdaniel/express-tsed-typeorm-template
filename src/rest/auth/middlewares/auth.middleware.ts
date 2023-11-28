import { AuthService } from "@app/index";
import {
  Context,
  Inject,
  Middleware,
  MiddlewareMethods,
  Req,
} from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  @Inject()
  private authService: AuthService;

  public async use(@Req() request: Req, @Context() ctx: Context) {
    const accessToken = request.get("authorization")?.split(" ")[1];
    if (!accessToken) {
      throw new Unauthorized("unauthorized");
    }

    const user = await this.authService.userFromToken(accessToken);
    if (!user) {
      throw new Unauthorized("unauthorized");
    }
    if (user) {
      ctx.set("current-user", { email: user.email, id: user.id });
    }
  }
}
