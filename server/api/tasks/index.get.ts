import { listTasks } from "~/shared/abilities";
import { findAllTasks } from "~/shared/lib/tasks";
import { verifyCsrf } from "~/utils/auth";

export default eventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    await verifyCsrf(event, session);
    await authorize(event, listTasks);

    const tasks = await findAllTasks();
    // const cachedKeys = await useStorage('db').setItem('test:foo', { hello: 'world' })
    // const tasks2 = await useStorage('db').get("tasks");
    // console.log("tasks:", tasks);
    return tasks || [];
  } catch (error: unknown) {
    console.error(error);
    throw createError(error);
  }
});
