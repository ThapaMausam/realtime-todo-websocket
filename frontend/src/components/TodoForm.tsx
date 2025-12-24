import { useState } from "react";
import { socket } from "../socket/socket";
// import type { Status } from "../types/todo";

export default function TodoForm() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const submitHandler = () => {
    if (!task || !deadline) return;

    socket.emit("add-todo", {
      task,
      deadline,
      status: "pending"
    });

    setTask("");
    setDeadline("");
  };

return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <input
          className="w-full bg-gray-100 text-gray-900 rounded-xl px-4 py-3 border-2 border-transparent focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200 placeholder-gray-500 font-medium"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <input
          type="date"
          className="flex-1 bg-gray-100 text-gray-700 rounded-xl px-4 py-3 border-2 border-transparent focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm font-medium"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        
        <button 
          onClick={submitHandler}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform active:scale-95"
        >
          <span>Add</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );

}
