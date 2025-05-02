import type { H3Event } from "h3";
import type { UserSessionRequired } from "#auth-utils";

export default async function (
  event: H3Event,
  userSession: UserSessionRequired
) {
  return replaceUserSession(
    event,
    {
      user: {
        id: userSession.user.id,
        name: userSession.user.name,
        roles: userSession.user.roles,
      },
      token: userSession.token,
      loggedInAt: +new Date(),
    },
    {
      maxAge: 60*60,
    }
  );
}
