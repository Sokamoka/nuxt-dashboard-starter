import type { DBUser } from "../users";

export const adminUser: DBUser = {
  id: "41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
  email: "admin@admin.com",
  password:
    "$scrypt$n=16384,r=8,p=1$nrtcpEmdNsar4Y75xDYOhg$Rk5VCoPhe9Tg5szc/RWW9SXZVXTbzUGWqpExBwd2lNrj5gt9f3rBLT4LKuMN08S1RWJaJkLqNc4tiePWNo7P9g", // password
  name: "Admin User",
  roles: [Roles.Admin, Roles.Editor],
  sessionToken: null,
  csrfToken: null,
};

export const editorUser: DBUser =  {
  id: "d0065700-1707-4ad9-811b-8bbed0364318",
  email: "editor@editor.com",
  password:
    "$scrypt$n=16384,r=8,p=1$qieG3ykteamHlccnWscC5A$tArNHMLXGSmpY2wuGfMo+kOI/U9f4girrwAKt8Z+I+xwG4BLwOYyMiTkR+3+wZfd0kSKZLcn4NAHJLf/dh4r3A", // password
  name: "Editor User",
  roles: [Roles.Editor],
  sessionToken: null,
  csrfToken: null,
};

export const users: DBUser[] = [
  {
    id: "41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
    email: "admin@admin.com",
    password:
      "$scrypt$n=16384,r=8,p=1$nrtcpEmdNsar4Y75xDYOhg$Rk5VCoPhe9Tg5szc/RWW9SXZVXTbzUGWqpExBwd2lNrj5gt9f3rBLT4LKuMN08S1RWJaJkLqNc4tiePWNo7P9g", // password
    name: "Admin User",
    roles: [Roles.Admin, Roles.Editor],
    sessionToken: null,
    csrfToken: null,
  },
  {
    id: "d0065700-1707-4ad9-811b-8bbed0364318",
    email: "editor@editor.com",
    password:
      "$scrypt$n=16384,r=8,p=1$qieG3ykteamHlccnWscC5A$tArNHMLXGSmpY2wuGfMo+kOI/U9f4girrwAKt8Z+I+xwG4BLwOYyMiTkR+3+wZfd0kSKZLcn4NAHJLf/dh4r3A", // password
    name: "Editor User",
    roles: [Roles.Editor],
    sessionToken: null,
    csrfToken: null,
  },
];
