import './App.css'
import { useTodos } from './useTodos'
import { TodoList } from './TodoList'
import { useAuth } from './useAuth'
import { AuthForm } from './AuthForm'

function App() {
  const auth = useAuth()

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
  } = useTodos(auth.currentUser)

  if (!auth.isAuthenticated) {
    return <AuthForm {...auth} />
  }

  return (
    <div className="app-container">
      <div className="todo-card">
        <div className="todo-header">
          <h1>Todo List</h1>
          <div>
            <span className="user-label">Hi, {auth.currentUser}</span>
            <button onClick={auth.handleLogout} className="btn btn-delete">Logout</button>
          </div>
        </div>

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
          <p className="empty-state">No todos.</p>
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
