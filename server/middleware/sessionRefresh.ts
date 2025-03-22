export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig(event)
  // try {
  const session = await getUserSession(event);
  console.log("session:");
  console.log(session);
  if (session.user) {
    await replaceUserSession(
      event,
      {
        ...session,
      },
      {
        maxAge: 60*60,
      }
    );
  }
});
