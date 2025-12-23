import { socket } from "../socket/socket";
import type { ITodo } from "../types/todo";

interface Props {
  todo: ITodo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      <span>{todo.task}</span>
      <span>{todo.deadline}</span>

      <button
        onClick={() =>
          socket.emit("update-status-todo", {
            id: todo._id,
            status: "completed",
          })
        }
      >
        ✔
      </button>

      <button
        onClick={() =>
          socket.emit("delete-todo", {
            id: todo._id,
          })
        }
      >
        ❌
      </button>
    </div>
  );
}
