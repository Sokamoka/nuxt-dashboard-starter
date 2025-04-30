import cryptoRandomString from "crypto-random-string";

export interface DBUser {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: Roles[];
  sessionToken: string | null;
  csrfToken: string | null;
}

// Fake users data
// const users: DBUser[] = [
//   {
//     id: "41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
//     email: "admin@admin.com",
//     password:
//       "$scrypt$n=16384,r=8,p=1$nrtcpEmdNsar4Y75xDYOhg$Rk5VCoPhe9Tg5szc/RWW9SXZVXTbzUGWqpExBwd2lNrj5gt9f3rBLT4LKuMN08S1RWJaJkLqNc4tiePWNo7P9g", // password
//     name: "Admin User",
//     roles: [Roles.Admin, Roles.Editor],
//     sessionToken: null,
//     csrfToken: null,
//   },
//   {
//     id: "d0065700-1707-4ad9-811b-8bbed0364318",
//     email: "editor@editor.com",
//     password:
//       "$scrypt$n=16384,r=8,p=1$qieG3ykteamHlccnWscC5A$tArNHMLXGSmpY2wuGfMo+kOI/U9f4girrwAKt8Z+I+xwG4BLwOYyMiTkR+3+wZfd0kSKZLcn4NAHJLf/dh4r3A", // password
//     name: "Editor User",
//     roles: [Roles.Editor],
//     sessionToken: null,
//     csrfToken: null,
//   },
// ];

export async function findAllUsers(): Promise<DBUser[] | undefined> {
  const rawUsers = await useStorage("db").getItem("users");
  return Array.isArray(rawUsers) ? rawUsers : undefined;
}

export async function findUserByEmail(
  email: string
): Promise<DBUser | undefined> {
  const rawUsers = await useStorage("db").getItem("users");
  const users: DBUser[] = Array.isArray(rawUsers) ? rawUsers : [];
  return users.find((user) => user.email === email);
}

export async function findUserById(
  id: DBUser["id"]
): Promise<DBUser | undefined> {
  const rawUsers = await useStorage("db").getItem("users");
  const users: DBUser[] = Array.isArray(rawUsers) ? rawUsers : [];
  return users.find((user) => user.id === id);
}

export async function insertOne(payload: Partial<DBUser>) {
  const { name = "", email = "", password = "" } = payload;
  const rawUsers = await useStorage("db").getItem("users");
  const users: DBUser[] = Array.isArray(rawUsers) ? rawUsers : [];

  const id = cryptoRandomString({ length: 32, type: "base64" });
  return users.push({
    id,
    name,
    email,
    password,
    roles: [Roles.Editor],
    sessionToken: null,
    csrfToken: null,
  });
}

export async function updateOne(
  id: DBUser["id"],
  payload: Partial<DBUser>
): Promise<DBUser | undefined> {
  const rawUsers = await useStorage("db").getItem("users");
  const users: DBUser[] = Array.isArray(rawUsers) ? rawUsers : [];
  const user = users.find((user) => user.id === id);
  Object.assign(user || {}, payload);
  await useStorage("db").setItem("users", users);
  return user;
}

export async function deleteUserSessionTokens(userId: string) {
  await updateOne(userId, { sessionToken: null, csrfToken: null });
}
