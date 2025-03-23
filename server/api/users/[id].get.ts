import { listUsers } from "~/shared/abilities";
import { findUserById, type User } from "~/shared/lib/users";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await authorize(event, listUsers, ["ADMIN"]);

  const user = await findUserById(id || "");

  return { name: user?.name, email: user?.email } as Partial<User>;
});
