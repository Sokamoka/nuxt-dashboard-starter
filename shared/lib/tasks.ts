import Tasks from "./data/tasks.json";

export interface DBTasks {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}

const tasks = Tasks.data;

export async function findAllTasks() {
  return tasks;
}
