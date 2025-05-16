"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DogResponse {
  message: string;
  status: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Page = () => {
  const [dogImage, setDogImage] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dog image
        const dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
        const dogData: DogResponse = await dogResponse.json();
        setDogImage(dogData.message);

        // Fetch todos
        const todosResponse = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todosData: Todo[] = await todosResponse.json();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      {dogImage ? (
        <Image 
          src={dogImage} 
          alt="Random Dog" 
          width={500}
          height={500}
          className="max-w-md rounded-lg shadow-lg mb-8"
        />
      ) : (
        <p>Loading dog image...</p>
      )}

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Todos</h2>
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-3 border rounded-lg flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="h-4 w-4"
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading todos...</p>
        )}
      </div>
    </div>
  );
};

export default Page;