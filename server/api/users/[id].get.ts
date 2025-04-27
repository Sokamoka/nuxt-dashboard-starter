import { listUsers } from "~/shared/abilities";
import { findUserById, type DBUser } from "~/shared/lib/users";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await authorize(event, listUsers, [Roles.Admin]);

  const user = await findUserById(id || "");
  const { name, email, roles } = user || {};

  return { name, email, roles } as Partial<DBUser>;
});
