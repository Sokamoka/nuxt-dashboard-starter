import { users } from "~/shared/lib/data/users";

export default defineNitroPlugin(async () => {
  console.log("Nitro plugin");

  if (!(await useStorage("db").hasItem("users"))) {
    await useStorage("db").setItem("users", users);
  }
});
