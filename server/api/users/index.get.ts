// import { listUsers } from "~/shared/abilities";
import { findAllUsers } from "~/shared/lib/users";
// import { getSession} from 'h3';

export default eventHandler(async (event) => {
  try {
    const userSession = await getUserSession(event)
    console.log(userSession);

    // await requireUserSession(event)

    // await authorize(event, listUsers, [Roles.Admin]);

    const users = await findAllUsers();

    return users;
  } catch (error) {
    console.error(error);
    return sendNoContent(event)
  }
});
