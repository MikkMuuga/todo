import './App.css'
import { useTodos } from './useTodos'
import { TodoList } from './TodoList'

function App() {
  const {
    todos,
    inputValue,
    setInputValue,
    editingId,
    editingText,
    setEditingText,
    addTodo,
    startEditing,
    saveEdit,
    toggleTodo,
    deleteTodo,
    handleKeyPress,
    setEditingId
  } = useTodos()

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>Todo List</h1>

        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTodo)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="btn btn-add">Add</button>
        </div>

        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.completed).length}</span>
          <span>Pending: {todos.filter(t => !t.completed).length}</span>
        </div>

        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one to get started!</p>
        ) : (
          <TodoList
            todos={todos}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            startEditing={startEditing}
            saveEdit={saveEdit}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            handleKeyPress={handleKeyPress}
            setEditingId={setEditingId}
          />
        )}
      </div>
    </div>
  )
}

export default App