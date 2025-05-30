// server/routes/ws.ts
export default defineWebSocketHandler({
  async upgrade(request) {
    // Make sure the user is authenticated before upgrading the WebSocket connection
    await requireUserSession(request);
  },
  async open(peer) {
    console.log("[ws] open:", peer.id);
    // const { user } = await requireUserSession(peer);
    const user = { name: "Akos", id: "1234" };
    peer.subscribe("chat");
    peer.send({ user: user.id, message: `Welcome ${user.name}(${peer})!` });
    peer.publish("chat", {
      user: user.id,
      message: `${user.name} joined!`,
    });
  },
  async message(peer, message) {
    // const { user } = await requireUserSession(peer);
    const user = { name: "Akos", id: "1234" };

    if (message.text().includes("ping")) {
      peer.send({ user: user.id, message: "pong" });
    } else {
      const msg = {
        user: user.id.toString(),
        message: message.toString(),
      };
      peer.publish("chat", msg);
      peer.send(msg); // echo
    }
  },
  async close(peer) {
    console.log("[ws] close:", peer.id);
    // const { user } = await requireUserSession(peer);
    const user = { name: "Akos", id: "1234" };
    peer.publish("chat", { user: user.id, message: `${peer} left!` });
    peer.unsubscribe("chat");
  },
  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
