import axios from 'axios'
export interface ITodo {
  _id?: string;
  title: string;
  completed: boolean;
  
}
interface TodoItemProps {
  todo:ITodo
  todos:ITodo[] 
  setTodos:any
  setSelectedTodo:any
}

export function TodoItem({ todo:{title, _id, completed}, setSelectedTodo,todos, setTodos }:TodoItemProps) {

async function handleDelete(){
  try {
    const res = await axios.delete("http://localhost:5000/todos/"+_id)
    console.log(res.data)
    setTodos(todos.filter(t=>t._id !==_id))
    alert("Todo deleted successully")
  } catch (error:any) {
    console.log(error.message)
    alert("Error deleting")
  }
}

async function handleUpdate(){
  try {
    await axios.put("http://localhost:5000/todos/"+_id, {completed:!completed})
   
    setTodos(todos.map(t=>t._id===_id?{...t, completed:!t.completed}:t))
   
  } catch (error:any) {
    console.log(error.message)
    alert("Error deleting")
  }
}

  return (
    <div className={`bg-slate-200 my-2 flex justify-between p-3 `}>
      <h3 className={completed ? "line-through" : ""}  onClick={()=>handleUpdate()}>{title}</h3>
      <div className="flex gap-3">
        <button
        onClick={()=>setSelectedTodo(todos.find(t=>t._id===_id))}
        
        className="px-4 py-2 rounded-lg bg-orange-400 text-white">Edit</button>
        <button
        onClick={()=>handleDelete()}
        className="px-4 py-2 rounded-lg bg-red-400 text-white">Delete</button>

      </div>
    </div>
  );
}
