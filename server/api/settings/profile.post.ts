import { updateOne } from "~/shared/lib/users";

export default defineEventHandler(async (event) => {
  // const { email, password } = await readValidatedBody(event, bodySchema.parse)
  const { name, email } = await readBody(event);

  const {
    user: { id },
  } = await requireUserSession(event);

  const user = await updateOne(id, { name, email });
  // console.log(user);

  return { success: true };
});
