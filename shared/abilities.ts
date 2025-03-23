import { defineAbility } from "nuxt-authorization/utils";
import type { DBUser } from "./lib/users";

export const listUsers = defineAbility((user: DBUser, roles: Roles[]) => {
  return isAllowed(roles, user.roles);
});

export const listProfile = defineAbility(() => true);

// export const editProfile = defineAbility((user: User, product: Product) => {
//   return user.id === product.ownerId
// })
