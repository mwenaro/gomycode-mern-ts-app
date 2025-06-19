import { useEffect, useState } from "react";
import { TodoItem, type ITodo } from "./components/TodoItem";
import { AddTodoForm } from "./components/AddTodoForm";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
    useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.data))
      .catch((error: any) => console.log("Error " + error.message));
  }, []);
useEffect(()=>{
  console.log(selectedTodo)
},[selectedTodo])
  return (
    <div className="bg-slate-300 text-blue-800 min-h-screen ">
      <h2>Todo App</h2>
      {/* Addtoform */}
      <AddTodoForm todo={selectedTodo} setTodos={setTodos} todos={todos} />
      <div className="">
        {todos.map((todo) => (
          <TodoItem todo={todo}
          todos={todos}
          setTodos={setTodos}
          setSelectedTodo={setSelectedTodo}
          key={todo._id} />
        ))}
      </div>
    </div>
  );
}
