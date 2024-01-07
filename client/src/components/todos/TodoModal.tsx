"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import { useTodoContext } from "@/contexts/TodoContext";
import { useModal } from "@/contexts/ModalContext";
import styles from "@/components/todos/styles/todoModal.module.css";

const TodoModal = () => {
  const taskContentRef = useRef<HTMLTextAreaElement | null>(null);
  const [error, setError] = useState(false);
  const { isOpen, closeModal, taskDetails } = useModal();
  const { addTodo, deleteTodo, updateTodo } = useTodoContext();

  useEffect(() => {
    setError(false);
  }, [isOpen]);

  const handleSave = () => {
    if (taskContentRef.current && taskContentRef.current.value !== "") {
      if (taskDetails) {
        // If task has an ID, update existing task
        updateTodo(taskDetails.id, { value: taskContentRef.current.value });
      }
      //else add new task
      else {
        addTodo({
          id: String(Date.now()),
          value: taskContentRef.current.value,
          checked: false,
        });
      }
      closeModal();
    } else setError(true);
  };

  const handleDelete = () => {
    if (taskDetails) {
      deleteTodo(taskDetails.id);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={styles["modal-header"]}>
        <h3>Add Todo</h3>
        <button onClick={closeModal}>&times;</button>
      </div>
      {error && <p style={{ color: "red" }}>Typing New Task Is Required</p>}
      <div className={styles["modal-body"]}>
        <textarea
          placeholder="Type your new task..."
          rows={3}
          cols={25}
          className={styles["textarea"]}
          ref={taskContentRef}
          defaultValue={taskDetails?.value ?? ""}
        ></textarea>
      </div>
      <div className={styles["modal-footer"]}>
        <Button text={"Save"} onClick={handleSave} />
        <Button text={"Delete"} onClick={handleDelete} />
      </div>
    </Modal>
  );
};
export default TodoModal;
