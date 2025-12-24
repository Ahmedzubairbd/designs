"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Lock, Eye, EyeOff, User } from "lucide-react"

export function SignUpModal() {
  const { showSignUpModal, setShowSignUpModal, setShowSignInModal, signUp } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signUp(name, phone, password)
    setLoading(false)
  }

  const switchToSignIn = () => {
    setShowSignUpModal(false)
    setShowSignInModal(true)
  }

  return (
    <Dialog open={showSignUpModal} onOpenChange={setShowSignUpModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">A</span>
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-center">{t("signUp")}</DialogTitle>
          <p className="text-sm text-muted-foreground">Create your patient account</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-phone">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="signup-phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : t("signUp")}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button type="button" className="text-primary hover:underline font-medium" onClick={switchToSignIn}>
              {t("signIn")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
