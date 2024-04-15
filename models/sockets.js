class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Validate JWT at this very moment
      // If token is not valid, disconnect the user
      // Check which user is active (uid)
      // Emit all users connected
      // Socket join, uid
      // Listen when the client sends a message
      // personal message. this means that the message is only for the user who sent it
      // handling disconnection
      // flag the user as offline
      // Emit all users connected
    })
  }
}

module.exports = Sockets
