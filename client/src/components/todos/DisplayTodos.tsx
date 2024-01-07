import styles from "@/components/todos/styles/displayTodos.module.css";
import { Todo } from "@/typings/types";
import TodoElement from "@/components/todos/TodoElement";
import { useTodoContext } from "@/contexts/TodoContext";

interface Props {
  todoElements?: Todo[];
}

const DisplayTodos: React.FC<Props> = () => {
  const { todos } = useTodoContext();
  return (
    <>
      {todos.length !> 0 ? (
        <ul className={`${styles["todos-container"]} mflex`}>
          {todos.map((todo) => (
            <TodoElement key={todo.id} todoElement={todo} />
          ))}
        </ul>
      ) : (
        <h2> Add Todos To Find Them Here</h2>
      )}
    </>
  );
};

export default DisplayTodos;
