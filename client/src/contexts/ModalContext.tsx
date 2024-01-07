"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Todo } from "@/typings/types";

interface ModalContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  taskDetails: Todo | undefined;
  setTaskDetails: (taskDetails: Todo) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Todo | undefined>(undefined);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTaskDetails(undefined);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, taskDetails, setTaskDetails }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }
  return context;
};
