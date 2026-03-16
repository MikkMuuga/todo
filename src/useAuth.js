import { useState } from 'react'

const USERS_KEY = 'todo-users-v1'
const CURRENT_USER_KEY = 'todo-current-user-v1'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadCurrentUser() {
  try {
    return localStorage.getItem(CURRENT_USER_KEY) || ''
  } catch {
    return ''
  }
}

function saveCurrentUser(username) {
  if (username) {
    localStorage.setItem(CURRENT_USER_KEY, username)
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function useAuth() {
  const [authMode, setAuthMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [users, setUsers] = useState(() => loadUsers())
  const [currentUser, setCurrentUser] = useState(() => loadCurrentUser())

  const isAuthenticated = Boolean(currentUser)

  const clearForm = () => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setAuthError('')
  }

  const handleRegister = () => {
    const name = username.trim()
    if (!name || !password.trim()) {
      setAuthError('Username and password are required.')
      return
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.')
      return
    }
    if (users[name]) {
      setAuthError('Username already exists.')
      return
    }

    const nextUsers = { ...users, [name]: password }
    setUsers(nextUsers)
    saveUsers(nextUsers)
    setAuthMode('login')
    setAuthError('Registration successful. Please login.')
    setPassword('')
    setConfirmPassword('')
  }

  const handleLogin = () => {
    const name = username.trim()
    if (!name || !password.trim()) {
      setAuthError('Username and password are required.')
      return
    }

    if (users[name] && users[name] === password) {
      setCurrentUser(name)
      saveCurrentUser(name)
      setAuthError('')
      clearForm()
    } else {
      setAuthError('Invalid username or password.')
    }
  }

  const handleLogout = () => {
    setCurrentUser('')
    saveCurrentUser('')
    setAuthMode('login')
    clearForm()
  }

  return {
    authMode,
    setAuthMode,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    authError,
    isAuthenticated,
    currentUser,
    handleRegister,
    handleLogin,
    handleLogout,
    clearForm
  }
}
