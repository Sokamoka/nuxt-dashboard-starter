import { defineAbility } from "nuxt-authorization/utils";
import type { DBUser } from "./lib/users";
import isAllowed from "./is-allowed";

export const listUsers = defineAbility((user: DBUser, roles: Roles[]) => {
  return isAllowed(user.roles, roles);
});

export const listProfile = defineAbility(() => true);

// export const editProfile = defineAbility((userId: string, product: Product) => {
//   return userId === product.ownerId
// })

export const listTasks = defineAbility(() => true);
