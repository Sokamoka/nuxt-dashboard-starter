import { findUserByEmail } from "~/shared/lib/users";

export default defineEventHandler(async (event) => {
  // const { email, password } = await readValidatedBody(event, bodySchema.parse)
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

  await setUserSession(event, {
    user: {
      name: userWithPassword.name,
      role: userWithPassword.roles[0],
    },
  });
  return { success: true };

  // if (email === "admin@admin.com" && password === "iamtheadmin") {
  //   // set the user session in the cookie
  //   // this server util is auto-imported by the auth-utils module
  //   await setUserSession(event, {
  //     user: {
  //       name: "John Doe",
  //       role: "admin",
  //     },
  //   });
  //   return { success: true };
  // }
  // if (email === "editor@editor.com" && password === "editor") {
  //   // set the user session in the cookie
  //   // this server util is auto-imported by the auth-utils module
  //   await setUserSession(event, {
  //     user: {
  //       name: "User John Doe",
  //       role: "editor",
  //     },
  //   });
  //   return { success: true };
  // }
  // throw createError({
  //   statusCode: 401,
  //   message: "Bad credentials",
  // });
});
