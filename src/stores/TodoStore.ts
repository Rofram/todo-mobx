import { makeAutoObservable, trace } from "mobx";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoStore = () => makeAutoObservable({
  list: [] as Todo[],
  add(text: string) {
    if (text.length < 3) return;

    const todo = {
      id: window.crypto.randomUUID(),
      text,
      completed: false
    };
    this.list.push(todo);
  },
  toggle(id: string) {
    const todo = this.list.find(t => t.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
  },
  remove(id: string) {
    this.list = this.list.filter(t => t.id !== id);
  },
  clearCompleted() {
    this.list = this.list.filter(t => !t.completed);
  },
  getAll() {
    return this.list;
  },
  get uncompleted() {
    // trace(true);
    return this.list.filter((t: Todo) => !t.completed);
  }
})

export default TodoStore;