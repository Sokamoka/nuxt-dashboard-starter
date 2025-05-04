import * as v from "valibot";
import { listUsers } from "~/shared/abilities";
import {
  findUserByEmail,
  // findUserById,
  updateOne,
  type DBUser,
} from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  email: v.pipe(v.string(), v.email("Invalid email")),
  roles: v.pipe(v.array(v.string())),
});

export default eventHandler(async (event) => {
  const userSession = await requireUserSession(event);
  await verifySessionCredentials(event, userSession);
  await authorize(event, listUsers, [Roles.Admin]);

  const id = getRouterParam(event, "id");

  const { name, email, roles } = await useValiBody(event, schema);

  const userByNewEmail = await findUserByEmail(email);
  if (userByNewEmail?.id !== id) {
    throw createError({
      statusCode: 400,
      statusText: "Bad Request",
      message: "E-mail is not free",
    });
  }

  await updateOne(id || "", {
    name,
    email,
    roles: roles.map((role) => role as Roles),
  });

  return { name, email, roles } as Partial<DBUser>;
});
