"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function OTPModal() {
  const { showOTPModal, setShowOTPModal, pendingPhone } = useAuth()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (showOTPModal) {
      inputRefs.current[0]?.focus()
    }
  }, [showOTPModal])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Mock OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setShowOTPModal(false)
    // Redirect to dashboard on success
  }

  const maskedPhone = pendingPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")

  return (
    <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">A</span>
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-center">Verify OTP</DialogTitle>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to {maskedPhone}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={loading || otp.some((d) => !d)}>
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn't receive code? </span>
            <button type="button" className="text-primary hover:underline font-medium">
              Resend OTP
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
