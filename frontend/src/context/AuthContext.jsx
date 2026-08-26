import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function getStoredAuth() {
  const storages = [window.localStorage, window.sessionStorage]

  for (const storage of storages) {
    const token = storage.getItem(TOKEN_KEY)
    const user = storage.getItem(USER_KEY)

    if (token && user) {
      try {
        return { token, user: JSON.parse(user), storage }
      } catch {
        storage.removeItem(TOKEN_KEY)
        storage.removeItem(USER_KEY)
      }
    }
  }

  return { token: null, user: null, storage: window.localStorage }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)

  const login = (user, token, rememberMe = true) => {
    const storage = rememberMe ? window.localStorage : window.sessionStorage
    const otherStorage = rememberMe ? window.sessionStorage : window.localStorage

    otherStorage.removeItem(TOKEN_KEY)
    otherStorage.removeItem(USER_KEY)
    storage.setItem(TOKEN_KEY, token)
    storage.setItem(USER_KEY, JSON.stringify(user))
    setAuth({ token, user, storage })
  }

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_KEY)
    setAuth({ token: null, user: null, storage: window.localStorage })
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        isAuthenticated: Boolean(auth.token && auth.user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
