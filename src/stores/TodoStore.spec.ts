import TodoStore from './TodoStore'

let todos = TodoStore()

let windowSpy: any;

describe('TodoList', () => {
  beforeEach(() => {
    todos = TodoStore()

    windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => ({
      crypto: {
        randomUUID: () => '123'
      }
    }))
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it('should add a todo', () => {
    todos.add('test')
    expect(todos.list.length).toBe(1)
    expect(todos.list[0].id).toBe('123')
  })

  it('cannot add a todo with less than 3 characters', () => {
    todos.add('12')
    expect(todos.list.length).toBe(0)
  })

  it('should remove todo', () => {
    todos.add('test')
    todos.remove('123')
    expect(todos.list.length).toBe(0)
  })

  it('should toggle todo', () => {
    todos.add('test')
    todos.toggle('123')
    expect(todos.list[0].completed).toBe(true)
    expect(todos.uncompleted.length).toBe(0)
  })

  it('should not toggle todo if it does not exist', () => {
    todos.toggle('123')
    expect(todos.list.length).toBe(0)
  })

  it('has uncompleted todos', () => {
    todos.add('test')
    expect(todos.uncompleted.length).toBe(1)
    todos.toggle('123')
    expect(todos.uncompleted.length).toBe(0)
  })

  it('should clear completed todos', () => {
    todos.add('test')
    todos.add('test2')
    todos.toggle('123')
    todos.clearCompleted()
    expect(todos.list.length).toBe(1)
  })

  it('should get all todos', () => {
    todos.add('test')
    todos.add('test2')
    expect(todos.getAll().length).toBe(2)
  })
})