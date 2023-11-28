import { useDecorators } from "@tsed/core";
import { Context } from "@tsed/platform-params";

export function CurrentUser() {
  return useDecorators(Context("current-user"));
}
