import { defineAbility } from "nuxt-authorization/utils"
import type { User } from "./lib/users"

export const listUsers = defineAbility((user: User, roles: User[]) => {
  return roles.includes(user.role);
})


export const listProfile = defineAbility(() => true)

export const editProfile = defineAbility((user: User, product: Product) => {
  return user.id === product.ownerId
})
