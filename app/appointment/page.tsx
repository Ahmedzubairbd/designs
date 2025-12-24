"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { doctors, branches } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Image from "next/image"

function AppointmentContent() {
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("doctor")
  const preselectedDoctor = doctorId ? doctors.find((d) => d.id === doctorId) : null

  const [date, setDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState(doctorId || "")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: preselectedDoctor?.branch || "",
    symptoms: "",
  })

  const doctor = doctors.find((d) => d.id === selectedDoctor)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Appointment booked successfully!")
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Book an Appointment</h1>

        <div className="grid gap-6">
          {doctor && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-primary">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                    <p className="text-sm font-medium mt-1">Fee: ৳{doctor.consultationFee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name} - {doc.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                          <SelectItem key={branch.id} value={branch.name}>
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

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Briefly describe your symptoms or reason for the appointment"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Confirm Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AppointmentPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto px-6 py-12 text-center">Loading...</div>}>
        <AppointmentContent />
      </Suspense>
      <Footer />
    </MainLayout>
  )
}
