import { useEffect, useState } from "react";
import type { ITodo } from "./TodoItem";

interface AddTodoFormProps {
  todo: ITodo | null;
  setTodos: any;
  todos: ITodo[];
  setSelectedTodo:any
}

export function AddTodoForm({ todo, setTodos, todos,setSelectedTodo }: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState<Partial<ITodo>>({ title: "" });
  useEffect(()=>{
        setNewTodo(todo||{title:""})
  },[todo])

  // handle change
  function handleChange(e: any) {
    setNewTodo({ ...newTodo, title: e.target.value });
    console.log(newTodo);
  }

  function handleSubmit() {
    if (!newTodo.title) return;
    fetch(`http://localhost:5000/todos${newTodo._id?"/"+newTodo._id : ""} `, {
      method:newTodo?._id?"PUT": "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((body) => {
        // console.log({body})
        if (!body.success) throw Error("An Error has occured!");
       
        if (body.data){
          if(newTodo._id) setTodos(todos.map(t=>t._id===newTodo._id?body.data:t))
           else setTodos([body.data, ...todos]);

          }
        alert(`Todo ${newTodo._id? 'Updated' : 'Added'} Successfully`);
        setSelectedTodo(null)
        setNewTodo({ title: "" });
      })
      .catch((error: any) => console.log("Error " + error.message));
  }

  return (
    <div className="p-4 flex justify-between">
      <input
          value={newTodo.title}
        onChange={handleChange}
        onKeyDown={(e)=>{
            
            if(e.code.toLowerCase() !== 'enter') return
            handleSubmit()
        }}
        className="px-6 py-3 bg-slate-50 text-black rounded-md"
      />
      <button
        onClick={() => handleSubmit()}
        className="px-4 py-2 rounded bg-green-500 text-white"
      >
        Save
      </button>
    </div>
  );
}
