import type { H3Error } from "h3";
import * as v from "valibot";
import { findUserById, updateOne } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

const schema = v.object({
  password: v.pipe(v.string(), v.minLength(4, "Must be at least 4 characters")),
  newPassword: v.pipe(
    v.string(),
    v.minLength(4, "Must be at least 4 characters")
  ),
});

export default defineEventHandler(async (event) => {
  try {
    const userSession = await requireUserSession(event);
    await verifySessionCredentials(event, userSession);

    const { password, newPassword } = await useValiBody(event, schema);

    const user = await findUserById(userSession.user.id);
    if (!user)
      throw createError({
        statusCode: 400,
        statusText: "Bad Request",
      });

    const verified = await verifyPassword(user.password, password);
    if (!verified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: "Password is not correct",
      });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await updateOne(userSession.user.id, { password: hashedNewPassword });

    return { success: true };
  } catch (error: unknown) {
    throw createError(error as H3Error);
  }
});
