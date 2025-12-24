"use client"

import { useLanguage } from "@/contexts/language-context"
import { doctors } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function HeroSliderCard() {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Show first 3 doctors on hero slider
  const heroShowDoctors = doctors.slice(0, 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroShowDoctors.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [heroShowDoctors.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroShowDoctors.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroShowDoctors.length) % heroShowDoctors.length)
  }

  const doctor = heroShowDoctors[currentIndex]

  return (
    <div className="relative h-full flex flex-col">
      <Card className="overflow-hidden border-2 border-primary/20 h-full flex flex-col shadow-lg">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Doctor Image */}
          <div className="relative h-48 overflow-hidden bg-secondary/30">
            <Image
              src={doctor.image || "/placeholder.svg?height=300&width=400&query=doctor portrait"}
              alt={language === "en" ? doctor.name : doctor.nameBn}
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {language === "en" ? doctor.specialty : doctor.specialtyBn}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {language === "en" ? doctor.name : doctor.nameBn}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{doctor.qualification}</p>
              <p className="text-xs text-muted-foreground mb-4">{doctor.experience}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {doctor.available.slice(0, 2).map((day) => (
                  <span key={day} className="text-xs px-2 py-1 bg-accent/20 text-accent-foreground rounded">
                    {day.slice(0, 3)}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{doctor.about}</p>
            </div>

            {/* Fee and Button */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="text-lg font-bold text-primary">৳{doctor.consultationFee}</div>
              <Button asChild size="sm" className="gap-1">
                <Link href={`/appointment?doctor=${doctor.id}`}>
                  <Calendar className="w-3 h-3" />
                  Book
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={goToPrev}
          className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
          aria-label="Previous doctor"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
          aria-label="Next doctor"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center gap-1 mt-3">
        {heroShowDoctors.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? "bg-primary" : "bg-border"}`}
            aria-label={`Show doctor ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
