import { deleteUserSessionTokens } from "~/shared/lib/users";

export default defineNitroPlugin(() => {
  // sessionHooks.hook('fetch', async (session) => {
  //  console.log('fetch:', session)
  // })
  sessionHooks.hook("clear", (session) => {
    deleteUserSessionTokens(session.user?.id ?? "");
  });
});
