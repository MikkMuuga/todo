import './App.css'

export function AuthForm({
  authMode,
  setAuthMode,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  authError,
  handleLogin,
  handleRegister
}) {
  return (
    <div className="app-container">
      <div className="todo-card auth-card">
        <h1>{authMode === 'login' ? 'Login' : 'Register'}</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="todo-input"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="todo-input"
        />

        {authMode === 'register' && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="todo-input"
          />
        )}

        <div className="auth-switch">
          <button
            className={`btn ${authMode === 'login' ? 'btn-add' : 'btn-edit'}`}
            onClick={() => {
              setAuthMode('login')
            }}
          >
            Login
          </button>
          <button
            className={`btn ${authMode === 'register' ? 'btn-add' : 'btn-edit'}`}
            onClick={() => {
              setAuthMode('register')
            }}
          >
            Register
          </button>
        </div>

        <button
          onClick={authMode === 'login' ? handleLogin : handleRegister}
          className="btn btn-add"
        >
          {authMode === 'login' ? 'Login' : 'Register'}
        </button>

        {authError && <p className="error-message">{authError}</p>}

        <p className="info-text">.</p>
      </div>
    </div>
  )
}
