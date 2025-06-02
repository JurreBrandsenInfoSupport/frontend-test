"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const res = await fetch("https://fast-api-hamburg-hjdecagqgab4ebda.westeurope-01.azurewebsites.net/todos");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = (await res.json()) as Todo[]; // ✅ Type assertion to fix "any" warning
        setTodos(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Fetch error:", err.message);
        } else {
          setError("Unknown error occurred");
          console.error("Unknown error:", err);
        }
      }
    };

    void fetchTodos(); // ✅ Fire-and-forget call, avoids warning
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          FastAPI <span className="text-[hsl(280,100%,70%)]">Todos</span>
        </h1>

        {error && <p className="text-red-400">{error}</p>}

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="rounded-xl bg-white/10 p-4">
              <h3 className="text-xl font-bold">{todo.title}</h3>
              <p>{todo.description}</p>
              <p className={todo.completed ? "text-green-400" : "text-yellow-400"}>
                {todo.completed ? "Completed" : "Pending"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
