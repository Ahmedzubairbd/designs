import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Inter, Merriweather, Heebo as V0_Font_Heebo, Geist_Mono as V0_Font_Geist_Mono, Merriweather as V0_Font_Merriweather } from 'next/font/google'

// Initialize fonts
const _heebo = V0_Font_Heebo({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _merriweather = V0_Font_Merriweather({ subsets: ['latin'], weight: ["300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "Amin Diagnostic & Medical Services",
  description:
    "One of the oldest diagnostic and medical service providers in greater Kushtia area, serving for more than 22 years with excellence in patient care.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
