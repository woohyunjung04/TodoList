import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-800 relative z-10">
        <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
          Task List
        </h1>
        <div className="flex mb-6 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-500 transition"
            placeholder="Enter a task..."
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition transform hover:scale-105"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500 transition group"
            >
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3 accent-amber-500 w-5 h-5 cursor-pointer"
                />
                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-100"
                  }
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-500 hover:text-red-400 focus:outline-none opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
