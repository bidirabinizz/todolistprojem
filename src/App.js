import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Verileri Firebase'den oku
  useEffect(() => {
    const todoRef = ref(db, "todos");
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedTodos = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setTodos(loadedTodos);
    });
  }, []);

  // Yeni todo ekle
  const addTodo = () => {
    if (!text.trim()) return;
    push(ref(db, "todos"), { text, completed: false });
    setText("");
  };

  // Tamamlandı durumunu değiştir
  const toggleTodo = (id, completed) => {
    update(ref(db, `todos/${id}`), { completed: !completed });
  };

  // Todo sil
  const deleteTodo = (id) => {
    remove(ref(db, `todos/${id}`));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Ortak ToDo List</h1>

      {/* Input ve Ekle butonu */}
      <div className="flex w-full max-w-md">
        <input
          className="flex-1 border p-2 rounded-l"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Görev ekle..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Ekle
        </button>
      </div>

      {/* Todo Listesi */}
      <ul className="w-full max-w-md mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-2 my-1 rounded shadow"
          >
            <span
              onClick={() => toggleTodo(todo.id, todo.completed)}
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 font-bold ml-2"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
