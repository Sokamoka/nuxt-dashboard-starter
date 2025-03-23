import { useValidatedBody } from "~/composables/useValidateBody";
import { insertOne } from "~/shared/lib/users";
import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await useValidatedBody(
    event,
    v.object({
      name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
      email: v.pipe(v.string(), v.email("Invalid email")),
      password: v.pipe(
        v.string(),
        v.minLength(6, "Must be at least 4 characters")
      ),
    })
  );

  const hashedPassword = await hashPassword(password);
  console.log(email);
  console.log(hashedPassword);

  // await db.sql`INSERT INTO users(email, password) VALUES (${email}, ${hashedPassword})`

  insertOne({ name, email, password: hashedPassword });

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
