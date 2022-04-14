import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";
import { Todo } from "../../stores/TodoStore";
import styles from "./styles.module.scss";


function TodoList() {
  const { todos } = useStores();

  const handleToggleTodo = (t: Todo) => () => {
    todos.toggle(t.id);
  }

  const handleRemoveTodo = (t: Todo) => () => {
    todos.remove(t.id);
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.list.map(todo => (
        <li key={todo.id}>
          <label 
            htmlFor={todo.id} 
            className={todo.completed ? styles.done : ''} 
          >
            {todo.text}
          </label>

          <button 
            onClick={handleRemoveTodo(todo)} 
            className={`${styles.remove} ${todo.completed ? styles.done : ''}`}
          >
            remove
          </button>

          <button onClick={handleToggleTodo(todo)}>
            <input type="checkbox" id={todo.id} readOnly tabIndex={-1} /> 
          </button>
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)