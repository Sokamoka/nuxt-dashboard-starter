import { listTasks } from "~/shared/abilities";
import { findAllTasks } from "~/shared/lib/tasks";
import { verifySessionCredentials } from "~/utils/auth";

export default eventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    await verifySessionCredentials(event, session);
    await authorize(event, listTasks);

    const tasks = await findAllTasks();
    return tasks || [];
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 400,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});
