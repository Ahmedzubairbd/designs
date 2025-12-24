"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Medical Assistance?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Our team of experienced doctors and staff are here to help you 24/7. Book an appointment or call us for
          immediate assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/appointment">
              <Calendar className="w-5 h-5" />
              {t("bookNow")}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
          >
            <a href="tel:+8801234567890">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/contact">
              Request Callback
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
