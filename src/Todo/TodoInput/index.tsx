import { useStores } from "../../stores";
import styles from './styles.module.scss';

export function TodoInput() {
  const { todos } = useStores();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget['todo-input'];    
    todos.add(input.value);
    input.value = '';
  }

  return (
    <form className={styles['todo-input-group']} onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="todo-input"
        placeholder="add a todo..."
      />
      <button type="submit">add todo</button> 
    </form>
  )
}