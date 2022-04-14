import { TodoInput } from './Todo/TodoInput'
import TodoList from './Todo/TodoList'
import styles from './App.module.scss'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { toJS } from 'mobx'
import React from 'react'
import { useStores } from './stores'
import TodoStore from './stores/TodoStore'

type AppProps = {
  todos: ReturnType<typeof TodoStore>
}

const App = observer(({ todos }: AppProps) => {

  const appUI = useLocalObservable(() => ({
    todosVisible: true,
    loading: false,
    *toggleTodoVisible() {
      this.loading = true;
      const loading = new Promise<boolean>(resolve => setTimeout(() => resolve(false), 1000))
      
      this.loading = yield loading;
      this.todosVisible = !this.todosVisible
    },
  }))

  React.useEffect(() => {
    // const disposeReaction = reaction(() => {
    //   return { todosVisible: appUI.todosVisible, loading: appUI.loading }
    // }, (oldValue, newValue) => {
    //   console.log({oldValue, newValue})
    // }, {
    //   fireImmediately: true,
    // })


    // const disposeAutoRun = autorun(() => {
    //   console.log(todos.list.length)
    //   throw new Error('test')
    // }, {
    //   delay: 1000,
    //   onError: (e) => {
    //     console.log(e.message)
    //   }
    // })

    return () => {
      // disposeReaction()
      // disposeAutoRun()
    }
  }, [])

  console.log(toJS(todos.list))

  // const todosVisible = observable.box(true)
  // todosVisible.observe_(({newValue}) => {
  //   console.log('todosVisible changed to', newValue)
  // })
  // todosVisible.set(false)
  // todosVisible.set(true)

  return (
    <div className="app">
      <TodoInput />
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={appUI.toggleTodoVisible}>
          <span>{appUI.todosVisible ? '-' : '+'}</span>
          Todos
          (unfinished: {todos.uncompleted.length})
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  )
})

const AppWrapper = () => {
  const { todos } = useStores()
  return <App todos={todos} />
}

export { App }
export default AppWrapper
