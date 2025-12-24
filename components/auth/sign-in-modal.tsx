"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Lock, Eye, EyeOff } from "lucide-react"

export function SignInModal() {
  const { showSignInModal, setShowSignInModal, setShowSignUpModal, signIn } = useAuth()
  const { t } = useLanguage()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn(phone, password)
    setLoading(false)
  }

  const switchToSignUp = () => {
    setShowSignInModal(false)
    setShowSignUpModal(true)
  }

  return (
    <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">A</span>
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-center">{t("signIn")}</DialogTitle>
          <p className="text-sm text-muted-foreground">Amin Diagnostic & Medical Services</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:underline">
              Forgot Password?
            </button>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : t("signIn")}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button type="button" className="text-primary hover:underline font-medium" onClick={switchToSignUp}>
              {t("signUp")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
