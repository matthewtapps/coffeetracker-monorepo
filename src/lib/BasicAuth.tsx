import React, { ReactNode } from "react";
import AUTH_ENTITIES from "./LOGINS"

const checkAuth = (username: string, password: string) => {
  const [UserEntity] = AUTH_ENTITIES.filter((entity) => (entity.username === username && entity.password === password))
  if (UserEntity) {
    return UserEntity.userId
  }
  else return null
}

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = React.useState<string | null>(null)

  const login = (username: string, password: string) => {
    const userId = checkAuth(username, password)
    if (userId) {
      setLoggedInUserId(userId)
      return true
    }
    return false
  }

  const logout = async () => {
    try {
      setLoggedInUserId(null)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{ user: loggedInUserId, login, logout }}>
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
