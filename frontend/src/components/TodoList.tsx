import type { ITodo } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: ITodo[];
}

export default function TodoList({ todos }: Props) {
  if (!todos.length) return <p>No pending todos 🎉</p>;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
