"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "bn"

interface Translations {
  [key: string]: {
    en: string
    bn: string
  }
}

const translations: Translations = {
  home: { en: "Home", bn: "হোম" },
  about: { en: "About Us", bn: "আমাদের সম্পর্কে" },
  departments: { en: "Departments", bn: "বিভাগসমূহ" },
  doctors: { en: "Find Doctor", bn: "ডাক্তার খুঁজুন" },
  tests: { en: "Diagnostic Tests", bn: "ডায়াগনস্টিক টেস্ট" },
  branches: { en: "Branches", bn: "শাখাসমূহ" },
  appointment: { en: "Book Appointment", bn: "অ্যাপয়েন্টমেন্ট বুক করুন" },
  contact: { en: "Contact", bn: "যোগাযোগ" },
  blog: { en: "Health Blog", bn: "স্বাস্থ্য ব্লগ" },
  faq: { en: "FAQ", bn: "জিজ্ঞাসা" },
  career: { en: "Career", bn: "ক্যারিয়ার" },
  signIn: { en: "Sign In", bn: "সাইন ইন" },
  signUp: { en: "Sign Up", bn: "সাইন আপ" },
  openToday: { en: "Open Today", bn: "আজ খোলা" },
  closedToday: { en: "Closed Today", bn: "আজ বন্ধ" },
  emergency: { en: "Emergency", bn: "জরুরি" },
  bookNow: { en: "Book Now", bn: "এখনই বুক করুন" },
  learnMore: { en: "Learn More", bn: "আরও জানুন" },
  viewAll: { en: "View All", bn: "সব দেখুন" },
  search: { en: "Search...", bn: "অনুসন্ধান..." },
  welcomeMessage: { en: "Your Health, Our Priority", bn: "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার" },
  heroSubtitle: {
    en: "Serving the greater Kushtia area for over 22 years with excellence in diagnostic and medical services",
    bn: "বৃহত্তর কুষ্টিয়া অঞ্চলে ২২ বছরেরও বেশি সময় ধরে ডায়াগনস্টিক ও চিকিৎসা সেবায় শ্রেষ্ঠত্বের সাথে সেবা প্রদান করছি",
  },
  testPackages: { en: "Test Packages", bn: "টেস্ট প্যাকেজ" },
  ourDoctors: { en: "Our Doctors", bn: "আমাদের ডাক্তারগণ" },
  ourServices: { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
  testimonials: { en: "Patient Testimonials", bn: "রোগীদের মতামত" },
  latestNews: { en: "Latest News", bn: "সর্বশেষ সংবাদ" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
