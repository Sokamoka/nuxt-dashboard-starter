import type { H3Error } from "h3";
import * as v from "valibot";
import { listUsers } from "~/shared/abilities";
import { findAllUsers } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

const schema = v.array(v.string());

export default defineEventHandler(async (event) => {
  try {
    const userSession = await requireUserSession(event);
    await verifySessionCredentials(event, userSession);
    await authorize(event, listUsers, [Roles.Admin]);

    const deletedUsers = await useValiBody(event, schema);
    console.log(deletedUsers);

    const users = await findAllUsers();

    // await updateOne(userSession.user.id, { name, email });

    return users;
  } catch (error: unknown) {
    throw createError(error as H3Error);
  }
});
