// Servidor de Express
const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")
const { dbConnection } = require("../database/config")

const Sockets = require("./sockets")

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 80

    // connect to DB
    dbConnection()

    // Http server
    this.server = http.createServer(this.app)

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      cors: {
        origin: "https://chat-backend-socket-react-9f7f791f4bad.herokuapp.com/",
        methods: ["GET", "POST"],
      },
    })
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")))

    // CORS
    this.app.use(cors())

    // Body parser
    this.app.use(express.json()) // read and parse body

    // API endpoints
    this.app.use("/api/login", require("../router/auth"))
    this.app.use("/api/messages", require("../router/messages"))
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io)
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares()

    // Inicializar sockets
    this.configurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port)
    })
  }
}

module.exports = Server
