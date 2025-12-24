"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { diagnosticTests, testPackages } from "@/lib/mock-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function TestsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTests = diagnosticTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const categories = [...new Set(diagnosticTests.map((t) => t.category))]

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Diagnostic Tests</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive diagnostic services with accurate results
          </p>
        </div>

        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="tests">Individual Tests</TabsTrigger>
            <TabsTrigger value="packages">Test Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="tests">
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {categories.map((category) => {
              const categoryTests = filteredTests.filter((t) => t.category === category)
              if (categoryTests.length === 0) return null

              return (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryTests.map((test) => (
                      <Card key={test.id}>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-foreground mb-1">
                            {language === "en" ? test.name : test.nameBn}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Clock className="w-4 h-4" />
                            Report in {test.duration}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground">৳{test.price}</span>
                            <Button asChild size="sm">
                              <Link href={`/tests/book?test=${test.id}`}>Book Now</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="packages">
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
                    <h3 className="font-semibold text-lg text-foreground">
                      {language === "en" ? pkg.name : pkg.nameBn}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-foreground">৳{pkg.price}</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-lg text-muted-foreground line-through">৳{pkg.originalPrice}</span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.tests.map((test, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent" />
                          <span className="text-foreground">{test}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={`/tests/book?package=${pkg.id}`}>Book Package</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </MainLayout>
  )
}
