import type { Roles } from "."

declare module '#app' {
  interface PageMeta {
    pageRoles?: Roles[];
  }
}

export {}
