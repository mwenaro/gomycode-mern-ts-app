import { useEffect, useState } from "react"
import { TodoItem, type ITodo } from "./components/TodoItem"


export default function App() {

  const[todos, setTodos] = useState<ITodo[]>([])

useEffect(()=>{
  fetch("http://localhost:5000/todos")
  .then(res=>res.json())
  .then(data=>setTodos(data.data))
  .catch((error:any)=>console.log("Error "+error.message))
},[])

  return (
    <div className="bg-slate-300 text-blue-800 min-h-screen ">


      {
        todos.map(todo=><TodoItem {...todo} key={todo._id} />)
      }
    </div>
  )
}
