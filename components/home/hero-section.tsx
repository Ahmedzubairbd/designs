"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Phone } from "lucide-react"
import Link from "next/link"
import { HeroSliderCard } from "./hero-slider-card"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/placeholder.svg?height=800&width=1600&query=modern hospital interior clean medical)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Serving for 22+ Years
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              {t("welcomeMessage")}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">{t("heroSubtitle")}</p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/appointment">
                  <Calendar className="w-5 h-5" />
                  {t("bookNow")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                <Link href="/doctors">
                  Find a Doctor
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm">
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                Emergency: +880 1234-567890
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <HeroSliderCard />
          </div>
        </div>
      </div>
    </section>
  )
}
