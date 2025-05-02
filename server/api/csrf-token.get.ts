import { getCsrfToken } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  await extendUserSession(event, session);
  return { csrfToken: await getCsrfToken(session.user.id as string) };
});
