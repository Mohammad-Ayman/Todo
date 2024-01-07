"use client";
import styles from "@/components/UI/styles/button.module.css";

interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<Props> = ({ text, onClick, className }) => {
  const buttonClassName = `${styles["button"]} ${className || ""}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
