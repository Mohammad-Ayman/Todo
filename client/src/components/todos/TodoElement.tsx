"use client";
import { useState } from "react";
import { ITodo } from "@/typings/interfaces";
import { useTodoContext } from "@/contexts/TodoContext";
import { useModal } from "@/contexts/ModalContext";
import styles from "@/components/todos/styles/todoElement.module.css";

interface Props {
  todoElement: ITodo;
}

const TodoElement: React.FC<Props> = ({ todoElement }) => {
  const { openModal, setTaskDetails } = useModal();
  const { completeTodo } = useTodoContext();
  const { completed, text, id } = todoElement;

  const [isCompleted, setIsCompleted] = useState(completed);
  const markCompleted = isCompleted ? styles["completed-task"] : "";

  const handleChecked = () => {
    setIsCompleted((prevState) => !prevState);
    completeTodo(id, { completed: isCompleted });
  };

  const handleEdit = () => {
    setTaskDetails(todoElement);
    openModal();
  };
  return (
    <li
      className={`${styles["todo-container"]} ${markCompleted}`}
      key={id}
      data-id={id}
    >
      <article>
        <input
          type="checkbox"
          checked={isCompleted}
          title="status"
          className={styles["checkbox-input"]}
          onChange={handleChecked}
        />
      </article>
      <article>
        <input
          type="text"
          value={text}
          title="todo element"
          placeholder="New Todo"
          className={`${styles["todo-text"]}`}
          readOnly
        />
      </article>
      <article onClick={handleEdit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={styles["todo-icon"]}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </article>
    </li>
  );
};

export default TodoElement;
