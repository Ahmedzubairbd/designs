"use client"

import { useLanguage } from "@/contexts/language-context"
import { format } from "date-fns"
import { Clock, Calendar } from "lucide-react"

export function Header() {
  const { t } = useLanguage()
  const today = new Date()
  const dayOfWeek = today.getDay()
  const isOpen = dayOfWeek !== 5 // Closed on Friday

  return (
    <header className="fixed top-0 left-16 right-16 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold text-lg md:text-xl">Amin Diagnostic</span>
        <span className="hidden sm:inline text-muted-foreground text-sm">& Medical Services</span>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
            isOpen ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive",
          )}
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">{isOpen ? t("openToday") : t("closedToday")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="hidden md:inline">{format(today, "EEEE, dd MMM, yyyy")}</span>
          <span className="md:hidden">{format(today, "dd/MM/yy")}</span>
        </div>
      </div>
    </header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
