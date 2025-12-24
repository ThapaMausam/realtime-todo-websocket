import { socket } from "../socket/socket";
import type { ITodo } from "../types/todo";

interface Props {
  todo: ITodo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <div className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200">
      
      {/* Checkbox / Complete Button */}
      <button
        className="shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors group/btn"
        onClick={() =>
          socket.emit("update-status-todo", {
            id: todo._id,
            status: "completed",
          })
        }
        title="Mark as completed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <span className="text-gray-800 font-medium text-base leading-tight">
            {todo.task}
        </span>
        {todo.deadline && (
            <span className="text-xs text-blue-500 mt-1 font-medium bg-blue-50 self-start px-2 py-0.5 rounded-md">
                {todo.deadline}
            </span>
        )}
      </div>

      {/* Delete Button - Shows on hover */}
      <button
        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        onClick={() =>
          socket.emit("delete-todo", {
            id: todo._id,
          })
        }
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  );
}