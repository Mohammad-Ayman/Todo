import styles from "@/components/UI/styles/header.module.css";

interface Props {
  header: string;
}

const Header: React.FC<Props> = ({ header }) => {
  return <h2 className={styles["header-text"]}>{header}</h2>;
};

export default Header;
