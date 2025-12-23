import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket/socket'
import type { ITodo } from './types/todo'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {

  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect( () => {
    
    // socket.emit("fetch-todo")

    socket.on("todo-updated", (response) => {
      if (response.status === "success") {
        setTodos(response.data)
      }
    })

    socket.on("todo-response", (response) => {
      console.error(response)
    })

    return () => {
      socket.off("todo-updated");
      socket.off("todo-response");
    }
  }, [])

  return (
    <>
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
    <h2>Socket.IO Todo</h2>
    <TodoForm />
    <TodoList todos={todos} />
    </div>
    </>
  )
}

export default App
