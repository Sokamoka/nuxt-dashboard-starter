import type { H3Error } from "h3";
import { listUsers } from "~/shared/abilities";
import { findAllUsers } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

export default eventHandler(async (event) => {
  try {
    const userSession = await requireUserSession(event);
    await verifySessionCredentials(event, userSession);
    await authorize(event, listUsers, [Roles.Admin]);

    const users = await findAllUsers();

    return users;
  } catch (error) {
    return createError(error as H3Error);
  }
});
