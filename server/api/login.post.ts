import { findUserByEmail } from "~/shared/lib/users";

export default defineEventHandler(async (event) => {
  // const { email, password } = await readValidatedBody(event, bodySchema.parse)
  // const config = useRuntimeConfig(event)
  const { email, password } = await readBody(event);

  const userWithPassword = await findUserByEmail(email);
  if (!userWithPassword) {
    throw createError({
      statusCode: 401,
      message: "Bad credentials",
    });
  }

  const verified = await verifyPassword(userWithPassword.password, password);
  if (!verified) {
    throw createError({
      statusCode: 401,
      message: "Bad credentials",
    });
  }

  await setUserSession(
    event,
    {
      user: {
        id: userWithPassword.id,
        name: userWithPassword.name,
        role: userWithPassword.roles[0],
      },
    },
    {
      maxAge: 60 * 60,
    }
  );
  return { success: true };
});
