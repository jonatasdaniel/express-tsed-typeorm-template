import { UseAuth } from "@tsed/common";
import { useDecorators } from "@tsed/core";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Returns } from "@tsed/schema";

export function BasicAuth() {
  return useDecorators(UseAuth(AuthMiddleware), Returns(401));
}
