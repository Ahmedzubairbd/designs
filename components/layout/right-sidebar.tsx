"use client"

import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Phone, Ambulance, Globe } from "lucide-react"

export function RightSidebar() {
  const { language, setLanguage, t } = useLanguage()
  const { setShowSignInModal, setShowSignUpModal, isAuthenticated, user } = useAuth()

  return (
    <aside className="fixed right-0 top-0 z-40 h-screen w-16 bg-card border-l border-border flex flex-col items-center py-4">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title={language === "en" ? "বাংলা" : "English"}
        >
          <Globe className="w-4 h-4" />
        </button>
        <span className="text-xs font-medium text-center text-muted-foreground">{language === "en" ? "EN" : "বাং"}</span>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-3">
        <a
          href="tel:+8801234567890"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          title={t("emergency")}
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href="tel:999"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          title="Ambulance"
        >
          <Ambulance className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {!isAuthenticated ? (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-2 bg-transparent"
              onClick={() => setShowSignInModal(true)}
            >
              {t("signIn")}
            </Button>
          </>
        ) : (
          <div className="text-xs text-center text-muted-foreground">{user?.name?.charAt(0)}</div>
        )}
      </div>
    </aside>
  )
}
