"use client"

import { useLanguage } from "@/contexts/language-context"
import { doctors } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function DoctorsSlider() {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  const availableDoctors = doctors.filter((doc) => doc.available.includes(today))
  const displayDoctors = availableDoctors.length > 0 ? availableDoctors : doctors.slice(0, 4)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayDoctors.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [displayDoctors.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayDoctors.length) % displayDoctors.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayDoctors.length)
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {availableDoctors.length > 0 ? `Doctors Available Today (${today})` : t("ourDoctors")}
            </h2>
            <p className="text-muted-foreground mt-2">Book your appointment with our experienced specialists</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={goToPrev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" onClick={goToNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayDoctors.map((doctor) => (
              <div key={doctor.id} className="w-full flex-shrink-0 px-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative h-64 md:h-auto">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={language === "en" ? doctor.name : doctor.nameBn}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-semibold text-foreground">
                          {language === "en" ? doctor.name : doctor.nameBn}
                        </h3>
                        <p className="text-primary font-medium">
                          {language === "en" ? doctor.specialty : doctor.specialtyBn}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{doctor.qualification}</p>
                        <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                        <p className="text-sm mt-4 text-foreground">{doctor.about}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {doctor.available.map((day) => (
                            <span
                              key={day}
                              className={`text-xs px-2 py-1 rounded-full ${
                                day === today
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground">৳{doctor.consultationFee}</span>
                          <Button asChild className="gap-2">
                            <Link href={`/appointment?doctor=${doctor.id}`}>
                              <Calendar className="w-4 h-4" />
                              Book Appointment
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {displayDoctors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
