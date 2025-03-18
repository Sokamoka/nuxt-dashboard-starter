import { findAllUsers, type User } from "~/shared/lib/users"

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  console.log(user)

  // List todos for the current user
  const users = await findAllUsers()

  return users as User[]
})
