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
    // console.error(error);
    // console.log(error.message);
    // console.log(error.statusCode);
    if (error.statusCode === 401 || error.statusCode === 403)
      return createError({
        statusCode: 401,
        statusText: "Unauthorized",
      });
    return createError({
      statusCode: 500,
      statusText: "Server Error",
      data: { message: error.message },
    });
  }
});
