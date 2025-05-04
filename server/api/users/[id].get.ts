import { listUsers } from "~/shared/abilities";
import { findUserById, type DBUser } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

export default eventHandler(async (event) => {
  const userSession = await requireUserSession(event);
  await verifySessionCredentials(event, userSession);
  await authorize(event, listUsers, [Roles.Admin]);

  const id = getRouterParam(event, "id");

  const user = await findUserById(id || "");
  const { name, email, roles } = user || {};

  return { name, email, roles } as Partial<DBUser>;
});
