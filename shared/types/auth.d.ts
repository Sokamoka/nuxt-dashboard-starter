import type { Roles } from "."

declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    roles: Roles[]
  }
}
export {}
