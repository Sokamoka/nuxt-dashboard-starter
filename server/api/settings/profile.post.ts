import { updateOne } from "~/shared/lib/users";
import { verifySessionCredentials } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    // const { email, password } = await readValidatedBody(event, bodySchema.parse)
    
    const userSession = await requireUserSession(event);
    await verifySessionCredentials(event, userSession);
    // await authorize(event, listUsers, [Roles.Admin]);
    
    const { name, email } = await readBody(event);
    
    await updateOne(userSession.user.id, { name, email });

    return { success: true };
  } catch {
    throw createError({ statusCode: 401 });
  }
});
