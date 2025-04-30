import type { Roles } from "."

declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    roles: Roles[]
  }
}
export {}
