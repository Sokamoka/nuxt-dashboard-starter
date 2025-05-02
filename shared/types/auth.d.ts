import type { Roles } from "."

declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    roles: Roles[]
  }

  interface UserSession {
    user: User,
    token: string,
    loggedInAt: Date | number,
  }
}
export {}
