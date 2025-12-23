// API = event e.g socket.on("send -- event")
// req.body = data
// request = socket
// data send = emit
// data receive = on

import app from './src/app.ts'
import { envConfig } from './src/config/config.ts'
import connectToDb from './src/config/dbConfig.ts'
import { Server } from 'socket.io'

let io:Server | undefined

function startServer() {

    connectToDb()

    const port = envConfig.port || 4000

    const server = app.listen(port, () => {
        console.log(`Server has started on port ${port}`)
    })

    // const io = new Server(server, {
    //     cors: {
    //         origin: "http://localhost:5173" // This is for client-server architecture but not needed for mono-architecture such as express and ejs
    //     }
    // })

    // io.on("connection", (socket) => {
    //     socket.on("send", (data) => {
    //         console.log(data)
    //         socket.emit("receive", {
    //             "message": "Task Received"
    //         })
    //     })
    //     console.log("Someone Connected (Client)")
    // })

    io = new Server(server)
}

export default function getSocketIo() {
    if (!io) {
        throw new Error("SocketIO not initialized.")
    } else {
        return io;
    }
}

startServer()