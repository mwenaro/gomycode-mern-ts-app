export interface ITodo {
  _id?: string;
  title: string;
  completed: boolean;
}

export function TodoItem({ title, _id, completed }: ITodo) {
  return (
    <div className={`flex justify-between p-3 ${completed ? "strike-though" : ""}`}>
      <h3>{title}</h3>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-orange-400 text-white">Edit</button>
        <button className="px-4 py-2 rounded-lg bg-red-400 text-white">Delete</button>

      </div>
    </div>
  );
}
