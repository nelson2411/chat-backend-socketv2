const { verifyJWT } = require("../helpers/jwt")

class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log(socket.handshake.query["x-token"])
      // Validate JWT at this very moment
      const [valid, uid] = verifyJWT(socket.handshake.query["x-token"])

      // If token is not valid, disconnect the user
      if (!valid) {
        console.log("Socket no identificado")
        return socket.disconnect()
      }
      console.info("Client connected", uid)

      // Check which user is active (uid)
      // Emit all users connected
      // Socket join, uid
      // Listen when the client sends a message
      // personal message. this means that the message is only for the user who sent it
      // handling disconnection
      socket.on("disconnect", () => {
        console.info("Client disconnected")
      })
      // flag the user as offline
      // Emit all users connected
    })
  }
}

module.exports = Sockets
