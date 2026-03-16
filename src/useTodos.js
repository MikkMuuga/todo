import { useState, useEffect } from 'react'

export function useTodos(username) {
  const storageKey = username ? `todos-${username}` : null

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!storageKey) {
      setTodos([])
      setInitialized(true)
      return
    }

    const saved = localStorage.getItem(storageKey)

    if (saved) {
      setTodos(JSON.parse(saved))
      setInitialized(true)  
      return
    }

    setTodos([])
    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (!storageKey || !initialized) return
    localStorage.setItem(storageKey, JSON.stringify(todos))
  }, [todos, storageKey, initialized])

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
