// server/routes/ws.ts
export default defineWebSocketHandler({
  async upgrade(request) {
    // Make sure the user is authenticated before upgrading the WebSocket connection
    await requireUserSession(request)
  },
  async open(peer) {
    const { user } = await requireUserSession(peer)

    peer.send(`Hello, ${user.name}!`)
  },
  message(peer, message) {
    peer.send(`Echo: ${message}`)
  },
})
