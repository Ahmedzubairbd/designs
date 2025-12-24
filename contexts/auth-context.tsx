"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  phone: string
  role: "patient" | "admin" | "moderator"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (phone: string, password: string) => Promise<boolean>
  signUp: (name: string, phone: string, password: string) => Promise<boolean>
  signOut: () => void
  showSignInModal: boolean
  showSignUpModal: boolean
  showOTPModal: boolean
  setShowSignInModal: (show: boolean) => void
  setShowSignUpModal: (show: boolean) => void
  setShowOTPModal: (show: boolean) => void
  pendingPhone: string
  setPendingPhone: (phone: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [pendingPhone, setPendingPhone] = useState("")

  const signIn = async (phone: string, password: string): Promise<boolean> => {
    // Mock sign in - replace with actual API call
    if (phone && password) {
      setPendingPhone(phone)
      setShowSignInModal(false)
      setShowOTPModal(true)
      return true
    }
    return false
  }

  const signUp = async (name: string, phone: string, password: string): Promise<boolean> => {
    // Mock sign up - replace with actual API call
    if (name && phone && password) {
      setPendingPhone(phone)
      setShowSignUpModal(false)
      setShowOTPModal(true)
      return true
    }
    return false
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        showSignInModal,
        showSignUpModal,
        showOTPModal,
        setShowSignInModal,
        setShowSignUpModal,
        setShowOTPModal,
        pendingPhone,
        setPendingPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
