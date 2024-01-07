"use client";
import TodoCard from "@/components/UI/Card";
import Header from "@/components/UI/Header";
import Button from "@/components/UI/Button";
import DisplayTodos from "@/components/todos/DisplayTodos";
import TodoModal from "@/components/todos/TodoModal";
import { useModal } from "@/contexts/ModalContext";
import { TodoProvider } from "@/contexts/TodoContext";
import styles from "@/app/page.module.css";

export default function Home() {
  const { openModal } = useModal();

  return (
    <TodoProvider>
      <TodoCard className={`${styles["card"]} mflex`}>
        <Header header={"Todo"} />
        <DisplayTodos />
        <Button text="Add Todo" onClick={openModal} />
        <TodoModal />
      </TodoCard>
    </TodoProvider>
  );
}

