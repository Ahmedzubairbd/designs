"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Mock hospital banner images and content
const hospitalBanners = [
  {
    id: "1",
    title: "State-of-the-Art Facilities",
    titleBn: "অত্যাধুনিক সুবিধা",
    description: "Our modern hospital equipped with latest medical technology",
    descriptionBn: "আমাদের আধুনিক হাসপাতাল সর্বশেষ চিকিৎসা প্রযুক্তি সম্পন্ন",
    image: "/modern-hospital-interior-advanced-medical-equipmen.jpg",
  },
  {
    id: "2",
    title: "Expert Medical Team",
    titleBn: "বিশেষজ্ঞ চিকিৎসা দল",
    description: "Experienced doctors and healthcare professionals",
    descriptionBn: "অভিজ্ঞ ডাক্তার এবং স্বাস্থ্যসেবা পেশাদাররা",
    image: "/doctors-team-hospital-meeting-professional.jpg",
  },
  {
    id: "3",
    title: "Patient-Centered Care",
    titleBn: "রোগী-কেন্দ্রিক যত্ন",
    description: "Compassionate care focused on your recovery",
    descriptionBn: "আপনার আরোগ্যের উপর দৃষ্টি নিবদ্ধ করে করুণাময় যত্ন",
    image: "/hospital-patient-care-compassionate-healthcare.jpg",
  },
  {
    id: "4",
    title: "Emergency Services 24/7",
    titleBn: "জরুরি সেবা ২৪/৭",
    description: "Round-the-clock emergency medical services",
    descriptionBn: "চব্বিশ ঘণ্টার জরুরি চিকিৎসা সেবা",
    image: "/hospital-emergency-room-ambulance-medical.jpg",
  },
  {
    id: "5",
    title: "Advanced Diagnostic Lab",
    titleBn: "উন্নত ডায়াগনস্টিক ল্যাব",
    description: "Complete diagnostic testing with quick results",
    descriptionBn: "দ্রুত ফলাফল সহ সম্পূর্ণ ডায়াগনস্টিক পরীক্ষা",
    image: "/laboratory-diagnostic-equipment-medical-testing.jpg",
  },
]

export function HospitalBannersSlider() {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hospitalBanners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + hospitalBanners.length) % hospitalBanners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hospitalBanners.length)
  }

  const banner = hospitalBanners[currentIndex]

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Why Choose Amin Diagnostic?</h2>
          <p className="text-muted-foreground">{t("ourCommitment") || "Committed to your health and wellbeing"}</p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border shadow-lg">
          <div className="relative h-96 md:h-[500px] bg-black overflow-hidden">
            {/* Banner Image */}
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={language === "en" ? banner.title : banner.titleBn}
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
                  {language === "en" ? banner.title : banner.titleBn}
                </h3>
                <p className="text-lg text-gray-100 mb-6">
                  {language === "en" ? banner.description : banner.descriptionBn}
                </p>
              </div>
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Next banner"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            {hospitalBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          {[
            { number: "22+", label: "Years of Service" },
            { number: "50+", label: "Expert Doctors" },
            { number: "10K+", label: "Happy Patients" },
            { number: "2", label: "Branches" },
            { number: "24/7", label: "Emergency" },
          ].map((stat, idx) => (
            <Card key={idx} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground text-pretty">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
