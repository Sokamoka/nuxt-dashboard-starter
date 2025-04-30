import { listUsers } from "~/shared/abilities";
import { findAllUsers } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

export default eventHandler(async (event) => {
  try {
    const userSession =  await requireUserSession(event)
    await verifySessionCredentials(event, userSession);
    await authorize(event, listUsers, [Roles.Admin]);

    const users = await findAllUsers();

    return users;
  } catch (error) {
    console.error(error);
    return createError({ statusCode: 401})
  }
});
