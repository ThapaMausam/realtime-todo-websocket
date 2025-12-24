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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Socket.IO Todo
        </h2>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="pt-8 px-8 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              My Tasks
            </h2>
          </div>
          <p className="text-gray-500 text-sm">Stay organized and focused</p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-6">
          <TodoForm />
        </div>

        {/* List Section */}
        <div className="bg-gray-50/50 min-h-75 border-t border-gray-100">
          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );

}

export default App
