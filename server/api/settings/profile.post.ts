import type { H3Error } from "h3";
import * as v from "valibot";
import { findUserByEmail, findUserById, updateOne } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

export default defineEventHandler(async (event) => {
  try {
    const userSession = await requireUserSession(event);
    await verifySessionCredentials(event, userSession);
    // await authorize(event, listUsers, [Roles.Admin]);

    const { name, email } = await useValiBody(event, schema);

    const user = await findUserById(userSession.user.id);
    if (user?.email !== email) {
      const userByNewEmail = await findUserByEmail(email);
      if (userByNewEmail)
        throw createError({
          statusCode: 400,
          statusText: "Bad Request",
          message: "E-mail is not free",
        });
    }

    await updateOne(userSession.user.id, { name, email });

    await replaceUserSession(event, {
      user: {
        id: userSession.user.id,
        name,
        roles: userSession.user.roles,
      },
      token: userSession.token,
      loggedInAt: +new Date(),
    }, {
      maxAge: 15
    });

    return { success: true };
  } catch (error: unknown) {
    throw createError(error as H3Error);
  }
});
