// "use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ITodo } from "@/typings/interfaces";
import { PATHS } from "@/api/constants";

export interface TodoContextProps {
  todos: ITodo[];
  getAllTasks: () => Promise<void>;
  addTodo: (newTodo: ITodo) => Promise<void>;
  completeTodo: (id: string, updatedStatus: Partial<ITodo>) => Promise<void>;
  updateTodo: (id: string, updatedTodo: Partial<ITodo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      await getAllTasks();
    };
    getTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await axios.get(PATHS.getAllTasks as string);
      console.log("response", response.data);
      // Update state with the tasks received from the server
      setTodos(response.data);
    } catch (error: any) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  };
  const addTodo = async (newTodo: ITodo) => {
    console.log("newTodo", newTodo);
    try {
      const response = await axios.post(PATHS.addNewTask as string, newTodo);
      console.log(response);
      // Update state with the new todo received from the server
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error: any) {
      throw new Error(`Error adding todo: ${error.message}`);
    }
  };

  const completeTodo = async (id: string, updatedStatus: Partial<ITodo>) => {
    try {
      const response = await axios.put(
        `${PATHS.updateStatus}/${id}`,
        updatedStatus
      );
      console.log(response.data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      );
    } catch (error: any) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  };

  const updateTodo = async (id: string, updatedTodo: Partial<ITodo>) => {
    try {
      const response = await axios.put(
        `${PATHS.updateTask}/${id}`,
        updatedTodo
      );

      // Update state with the updated todo received from the server
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      );
    } catch (error: any) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${PATHS.deleteTask}/${id}`);

      // Update state by removing the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error: any) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        getAllTasks,
        addTodo,
        completeTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
