import { listProfile } from "~/shared/abilities";
import { findUserById, type User } from "~/shared/lib/users";

export default eventHandler(async (event) => {
  const {
    user: { id },
  } = await requireUserSession(event);

  await authorize(event, listProfile);

  // console.log(user)

  const userData = await findUserById(id);

  return userData as User;
});
