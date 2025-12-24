"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Info,
  Building2,
  Stethoscope,
  TestTube,
  MapPin,
  Calendar,
  Phone,
  FileText,
  HelpCircle,
  Briefcase,
  MessageCircle,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLanguage } from "@/contexts/language-context"

const menuItems = [
  { href: "/", icon: Home, labelKey: "home" },
  { href: "/about", icon: Info, labelKey: "about" },
  { href: "/departments", icon: Building2, labelKey: "departments" },
  { href: "/doctors", icon: Stethoscope, labelKey: "doctors" },
  { href: "/tests", icon: TestTube, labelKey: "tests" },
  { href: "/branches", icon: MapPin, labelKey: "branches" },
  { href: "/appointment", icon: Calendar, labelKey: "appointment" },
  { href: "/contact", icon: Phone, labelKey: "contact" },
  { href: "/blog", icon: FileText, labelKey: "blog" },
  { href: "/faq", icon: HelpCircle, labelKey: "faq" },
  { href: "/career", icon: Briefcase, labelKey: "career" },
]

export function LeftSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-40 h-screen w-16 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          <Link href="/" className="text-sidebar-primary font-bold text-xl">
            A
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="flex flex-col gap-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="sr-only">{t(item.labelKey)}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground border-sidebar-border">
                      {t(item.labelKey)}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-2 border-t border-sidebar-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center justify-center w-12 h-12 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">Live Chat</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground border-sidebar-border">
              Live Chat
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
