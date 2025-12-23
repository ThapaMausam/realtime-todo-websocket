import type { Socket } from "socket.io";
import getSocketIo from "../../server.ts";
import { todoModel } from "./todoModel.ts";
import { Status, type ITodo } from "./todoTypes.ts";

class Todo {

    private io = getSocketIo()

    constructor() {
        this.io.on("connection", (socket:Socket) => {
            console.log(`New client connected: ${socket.id}`);

            // Add-Todo
            socket.on("add-todo", (data) => this.handleAddToDo(socket, data))

            // Delete-Todo
            socket.on("delete-todo", (data:{id: string}) => {
                this.handleDeleteTodo(socket, data)
            })

            // StatusUpdate-Todo
            socket.on("update-status-todo", (data:{id:string, status: Status}) => {
                this.handleUpdateTodoStatus(socket, data)
            })

            // Fetch-Todo
            // socket.on("fetch-todo", () => {
            //     this.getPendingTodos(socket)
            // })

            this.getPendingTodos(socket)

            socket.on("disconnect", () => {
                console.log(`Client disconnnected: ${socket.id}`)
            })
        })
    }

    // Handling Add-Todo
    private async handleAddToDo(socket:Socket, data: ITodo) {
        try {
            const { task, deadline, status } = data
            await todoModel.create({
                task, // task: task
                deadline,
                status
            })

            const todos = await todoModel.find({status: Status.Pending})
            socket.emit("todo-updated", {
                status: "success",
                data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {
                status: "error",
                error
            })
        }
    }

    // Handling Delete-Todo
    private async handleDeleteTodo(socket:Socket, data:{id: string}) {
        
        try {
            const { id } = data

            const deleteTodo = await todoModel.findByIdAndDelete(id)

            console.log(deleteTodo)

            if (!deleteTodo) {
                socket.emit("todo-response", {
                    status: "error",
                    "message": "Data not found"
                })
                return
            }

            const todos = await todoModel.find({status: Status.Pending})
            socket.emit("todo-updated", {
                    status: "success",
                    data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {
                status: "error",
                error
            })
        }

    }

    // Handling StatusUpdate-Todo
    private async handleUpdateTodoStatus(socket:Socket, data:{id: string, status: Status}) {

        try {
            const { id, status } = data

            const updatedTodo = await todoModel.findByIdAndUpdate(id, {
                status //status: status
            })

            if (!updatedTodo) {
                socket.emit("todo-response", {
                    status: "error",
                    "message": "Data not found"
                })
                return
            }

            const todos = await todoModel.find({status: Status.Pending})

            socket.emit("todo-updated", {
                status: "success",
                data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {
                status: "error",
                error
            })
        }
    }

    private async getPendingTodos(socket:Socket) {
        try {
            const todos = await todoModel.find({status: Status.Pending})
            socket.emit("todo-updated", {
                status: "success",
                data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {
                status: "error",
                error
            })
        }
    }
}

export default new Todo()