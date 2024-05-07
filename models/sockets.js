const { verifyJWT } = require("../helpers/jwt")
const {
  userConnected,
  userDisconnected,
  getAllUsers,
} = require("../controllers/sockets")

class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      console.log(socket.handshake.query["x-token"])
      // Validate JWT at this very moment
      const [valid, uid] = verifyJWT(socket.handshake.query["x-token"])

      // If token is not valid, disconnect the user
      if (!valid) {
        console.log("Socket no identificado")
        return socket.disconnect()
      }

      // Check which user is active (uid)
      const user = await userConnected(uid)
      console.info(`${user.name} connected`)

      // Emit all users connected
      this.io.emit("list-users", await getAllUsers())

      // Socket join, uid
      // Listen when the client sends a message
      // personal message. this means that the message is only for the user who sent it
      // handling disconnection
      socket.on("disconnect", async () => {
        await userDisconnected(uid)
        this.io.emit("list-users", await getAllUsers())
      })
      // flag the user as offline
      // Emit all users connected
    })
  }
}

module.exports = Sockets
