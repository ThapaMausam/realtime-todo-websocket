import type { ITodo } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: ITodo[];
}

export default function TodoList({ todos }: Props) {
  if (!todos.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-900 font-medium text-lg">All caught up!</p>
        <p className="text-gray-500 text-sm mt-1">No pending todos available.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

