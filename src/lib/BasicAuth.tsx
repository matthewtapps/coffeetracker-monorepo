import React, { ReactNode } from "react";
import AUTH_ENTITIES from "./LOGINS"

const checkAuth = (username: string, password: string) => {
  const [UserEntity] = AUTH_ENTITIES.filter((entity) => (entity.username === username && entity.password === password))
  if (UserEntity) {
    return UserEntity.userId
  }
  else return ""
}

interface AuthContextType {
  userId: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = React.useState<string>(() => {
    const cachedUser = sessionStorage.getItem('userId')
    return cachedUser ? JSON.parse(cachedUser) : "";
  })

  const login = (username: string, password: string) => {
    const userId = checkAuth(username, password)
    if (userId !== "") {
      setLoggedInUserId(userId)
      sessionStorage.setItem('userId', JSON.stringify(userId))
      return true
    }
    return false
  }

  const logout = async () => {
    try {
      setLoggedInUserId("")
      sessionStorage.removeItem('userId')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{ userId: loggedInUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  return context
}
