"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { diagnosticTests, testPackages, branches } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

function BookTestContent() {
  const searchParams = useSearchParams()
  const testId = searchParams.get("test")
  const packageId = searchParams.get("package")

  const selectedTest = testId ? diagnosticTests.find((t) => t.id === testId) : null
  const selectedPackage = packageId ? testPackages.find((p) => p.id === packageId) : null

  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Booking submitted successfully!")
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Book Diagnostic Test</h1>

        <div className="grid gap-6">
          {(selectedTest || selectedPackage) && (
            <Card>
              <CardHeader>
                <CardTitle>Selected {selectedPackage ? "Package" : "Test"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedTest?.name || selectedPackage?.name}</h3>
                    {selectedPackage && (
                      <ul className="mt-2 space-y-1">
                        {selectedPackage.tests.map((test, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-3 h-3" />
                            {test}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    ৳{selectedTest?.price || selectedPackage?.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Branch</Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => setFormData({ ...formData, branch: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function BookTestPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto px-6 py-12 text-center">Loading...</div>}>
        <BookTestContent />
      </Suspense>
      <Footer />
    </MainLayout>
  )
}
