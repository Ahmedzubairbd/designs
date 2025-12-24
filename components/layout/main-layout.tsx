"use client"

import type React from "react"

import { LeftSidebar } from "./left-sidebar"
import { RightSidebar } from "./right-sidebar"
import { Header } from "./header"
import { SignInModal } from "@/components/auth/sign-in-modal"
import { SignUpModal } from "@/components/auth/sign-up-modal"
import { OTPModal } from "@/components/auth/otp-modal"
import { LiveChat } from "@/components/chat/live-chat"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <LeftSidebar />
      <RightSidebar />
      <Header />
      <main className="ml-16 mr-16 pt-16 min-h-screen">{children}</main>
      <SignInModal />
      <SignUpModal />
      <OTPModal />
      <LiveChat />
    </div>
  )
}
