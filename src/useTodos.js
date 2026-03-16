import { useState, useEffect } from 'react'

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() === '') return
    setTodos([...todos, {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleString()
    }])
    setInputValue('')
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = (id) => {
    if (editingText.trim() === '') return
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText } : todo))
    setEditingId(null)
    setEditingText('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') action()
    else if (e.key === 'Escape') setEditingId(null)
  }

  return {
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
  }
}
