import { listUsers } from "~/shared/abilities"
import { findAllUsers, type User } from "~/shared/lib/users"

export default eventHandler(async (event) => {
  // const { user } = await requireUserSession(event)

  await authorize(event, listUsers, ['ADMIN'])

  // console.log(user)

  // List todos for the current user
  const users = await findAllUsers()

  return users as User[]
})
