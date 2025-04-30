import { listProfile } from "~/shared/abilities";
import { findUserById, type DBUser } from "~/shared/lib/users";

export default eventHandler(async (event) => {
  const {
    user: { id },
  } = await requireUserSession(event);

  await authorize(event, listProfile);

  const userData = await findUserById(id);

  return userData as DBUser;
});
