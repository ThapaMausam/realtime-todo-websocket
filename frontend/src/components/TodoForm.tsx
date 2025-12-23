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
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={submitHandler}>Add</button>
    </div>
  );
}
