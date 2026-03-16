export function TodoList({ 
  todos, 
  editingId, 
  editingText, 
  setEditingText, 
  startEditing, 
  saveEdit, 
  toggleTodo, 
  deleteTodo, 
  handleKeyPress,
  setEditingId
}) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one to get started!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />

          {editingId === todo.id ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, () => saveEdit(todo.id))}
              className="todo-edit-input"
              autoFocus
            />
          ) : (
            <span className="todo-text">{todo.text}</span>
          )}

          <span className="todo-date">{todo.createdAt}</span>

          {editingId === todo.id ? (
            <>
              <button onClick={() => saveEdit(todo.id)} className="btn btn-save">Save</button>
              <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => startEditing(todo.id, todo.text)} className="btn btn-edit">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-delete">Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
