import type { H3Error } from "h3";
import * as v from "valibot";
import useValiQuery from "~/server/utils/useValiQuery";
import { listTasks } from "~/shared/abilities";
import { findAllTasks } from "~/shared/lib/tasks";
import { verifySessionCredentials } from "~/utils/auth";

const schema = v.object({
  skip: v.pipe(v.string()),
  limit: v.pipe(v.string()),
});

export default eventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    await verifySessionCredentials(event, session);
    await authorize(event, listTasks);

    const { skip, limit } = await useValiQuery(event, schema);

    const tasks = await findAllTasks();
    const range = (tasks || []).slice().splice(Number(skip) || 0, Number(limit) || 0);
    return { total: tasks.length, rows: range };
  } catch (error: unknown) {
    throw createError(error as H3Error);
  }
});
