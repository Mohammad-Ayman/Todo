"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import { useTodoContext } from "@/contexts/TodoContext";
import { useModal } from "@/contexts/ModalContext";
import styles from "@/components/todos/styles/todoModal.module.css";

const TodoModal = () => {
  const { isOpen, closeModal, taskDetails } = useModal();
  const { addTodo, deleteTodo, updateTodo } = useTodoContext();
  const taskContentRef = useRef<HTMLTextAreaElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const handleSave = async () => {
    try {
      if (taskContentRef.current && taskContentRef.current.value !== "") {
        if (taskDetails) {
          // If task has an ID, update existing task
          await updateTodo(taskDetails.id, {
            text: taskContentRef.current.value,
          });
        } else {
          await addTodo({
            id: String(Date.now()),
            text: taskContentRef.current.value,
            completed: false,
          });
        }
        closeModal(); // Close modal if no error
      } else {
        setError("Todo Text Is Required");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (taskDetails) {
        await deleteTodo(taskDetails.id);
      }
      closeModal(); // Close modal if no error
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={styles["modal-header"]}>
        <h3>Add Todo</h3>
        <button onClick={closeModal}>&times;</button>
      </div>
      {error && (
        <p style={{ color: "red", fontSize: "1rem", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <div className={styles["modal-body"]}>
        <textarea
          placeholder="Type your new task..."
          rows={3}
          cols={25}
          className={styles["textarea"]}
          ref={taskContentRef}
          defaultValue={taskDetails?.text ?? ""}
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
