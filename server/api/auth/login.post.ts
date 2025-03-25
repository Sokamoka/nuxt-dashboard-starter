import * as v from "valibot";
import { useValidatedBody } from "~/composables/useValidateBody";
import { findUserByEmail } from "~/shared/lib/users";

export default defineEventHandler(async (event) => {
   const { email, password } = await useValidatedBody(
      event,
      v.object({
        email: v.pipe(v.string(), v.email("Invalid email")),
        password: v.pipe(
          v.string(),
          v.minLength(4, "Must be at least 4 characters")
        ),
      })
    );

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
        roles: userWithPassword.roles,
      },
    },
    // {
    //   maxAge: 30,
    // }
  );
  return { success: true };
});
