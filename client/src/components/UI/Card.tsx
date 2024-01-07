import { CSSProperties, ReactNode } from "react";
import styles from "@/components/UI/styles/card.module.css";
import { DynamicAttributes } from "@/typings/types";

interface Props {
  className?: string;
  style?: CSSProperties;
  inputProps?: DynamicAttributes;
  onClick?: () => void | DynamicAttributes;
  children: ReactNode;
}

const Card: React.FC<Props> = ({
  className = "",
  children,
  onClick,
  ...inputProps
}) => {
  const classes = `${styles["todo-card"]} ${className}`;
  return (
    <div className={classes} {...inputProps}>
      {children}
    </div>
  );
};

export default Card;
