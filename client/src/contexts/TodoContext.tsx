"use client";
import React, { createContext, useContext, useState } from "react";
import { ITodo } from "@/typings/interfaces";
import { PATHS } from "@/api/constants";

export interface TodoContextProps {
  todos: ITodo[];
  addTodo: (newTodo: ITodo) => void;
  updateTodo: (id: string, updatedTodo: Partial<ITodo>) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (newTodo: ITodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id: string, updatedTodo: Partial<ITodo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
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
