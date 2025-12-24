"use client"

import { useLanguage } from "@/contexts/language-context"
import { testPackages } from "@/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export function TestPackagesSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Special Offers
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("testPackages")}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Comprehensive health checkup packages at discounted prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testPackages.map((pkg) => (
            <Card key={pkg.id} className="relative overflow-hidden">
              {pkg.originalPrice > pkg.price && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-destructive text-destructive-foreground">
                    {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              )}
              <CardHeader>
                <h3 className="font-semibold text-lg text-foreground">{language === "en" ? pkg.name : pkg.nameBn}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">৳{pkg.price}</span>
                  {pkg.originalPrice > pkg.price && (
                    <span className="text-lg text-muted-foreground line-through">৳{pkg.originalPrice}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {pkg.tests.map((test, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-foreground">{test}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/tests/book?package=${pkg.id}`}>{t("bookNow")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
