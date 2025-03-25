import { listTasks } from "~/shared/abilities"
import { findAllTasks } from "~/shared/lib/tasks"

export default eventHandler(async (event) => {
  await authorize(event, listTasks)

  const tasks = await findAllTasks()

  return tasks;
})
