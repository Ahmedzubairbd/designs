"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { departments } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Baby, Bone, User, Scan, TestTube, Ear } from "lucide-react"
import Link from "next/link"

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Heart,
  Baby,
  Bone,
  User,
  Scan,
  TestTube,
  Ear,
}

export function ServicesSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("ourServices")}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Comprehensive healthcare services across multiple specialties
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.slice(0, 8).map((dept) => {
            const Icon = iconMap[dept.icon] || Heart
            return (
              <Card key={dept.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{language === "en" ? dept.name : dept.nameBn}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {language === "en" ? dept.description : dept.descriptionBn}
                  </p>
                  <Link
                    href={`/departments/${dept.id}`}
                    className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
                  >
                    {t("learnMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/departments">
              {t("viewAll")} Departments
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
