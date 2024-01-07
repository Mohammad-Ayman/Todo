import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/UI/styles/modal.module.css";
import Card from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Card className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Card>,
    document.getElementById("overlay-root") || document.body
  );
};

export default Modal;
