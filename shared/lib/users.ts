export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: string[];
}

// Fake users data
const users: User[] = [
  {
    id: "41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
    email: "admin@admin.com",
    password: "$scrypt$n=16384,r=8,p=1$nrtcpEmdNsar4Y75xDYOhg$Rk5VCoPhe9Tg5szc/RWW9SXZVXTbzUGWqpExBwd2lNrj5gt9f3rBLT4LKuMN08S1RWJaJkLqNc4tiePWNo7P9g", // password
    name: 'Admin User',
    roles: ["ADMIN"],
  },
  {
    id: "d0065700-1707-4ad9-811b-8bbed0364318",
    email: "editor@editor.com",
    password: "$scrypt$n=16384,r=8,p=1$qieG3ykteamHlccnWscC5A$tArNHMLXGSmpY2wuGfMo+kOI/U9f4girrwAKt8Z+I+xwG4BLwOYyMiTkR+3+wZfd0kSKZLcn4NAHJLf/dh4r3A", // password
    name: 'Editor User',
    roles: ["EDITOR"],
  },
];

export async function findAllUsers() {
  return users;
}

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export async function findUserById(id: string) {
  return users.find((user) => user.id === id);
}

// export async function isAdmin(user?: User) {
//   return user && user.roles.includes("ADMIN");
// }
