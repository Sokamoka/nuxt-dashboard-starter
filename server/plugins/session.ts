import { deleteUserSessionTokens } from "~/shared/lib/users";

export default defineNitroPlugin(() => {
  sessionHooks.hook("clear", (session) => {
    deleteUserSessionTokens(session.user?.id ?? "");
  });
});
