"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Youtube, Instagram } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Amin Diagnostic
              <span className="block text-sm font-normal opacity-80">& Medical Services</span>
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Serving the greater Kushtia area for over 22 years with excellence in diagnostic and medical services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-sidebar-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sidebar-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sidebar-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sidebar-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/departments"
                  className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all"
                >
                  {t("departments")}
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all"
                >
                  {t("doctors")}
                </Link>
              </li>
              <li>
                <Link href="/tests" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  {t("tests")}
                </Link>
              </li>
              <li>
                <Link href="/career" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  {t("career")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tests" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  Pathology
                </Link>
              </li>
              <li>
                <Link href="/tests" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  Radiology
                </Link>
              </li>
              <li>
                <Link href="/tests" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
                  Cardiology Tests
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all"
                >
                  {t("appointment")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all"
                >
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">+880 1234-567890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">info@amindiagnostic.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">123 Hospital Road, Kushtia Sadar, Kushtia-7000</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">24/7 Emergency Services</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Amin Diagnostic & Medical Services. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
              Privacy Policy
            </Link>
            <Link href="/terms" className="opacity-80 hover:opacity-100 hover:text-sidebar-primary transition-all">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
