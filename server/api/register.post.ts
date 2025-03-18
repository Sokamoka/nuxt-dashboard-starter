export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const hashedPassword = await hashPassword(password);
  console.log(email);
  console.log(hashedPassword);

  // await db.sql`INSERT INTO users(email, password) VALUES (${email}, ${hashedPassword})`

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      id: email,
      role: "EDITOR",
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
