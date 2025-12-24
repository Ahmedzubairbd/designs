"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { doctors, departments } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function DoctorsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("all")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      selectedDepartment === "all" || doctor.specialty.toLowerCase().includes(selectedDepartment.toLowerCase())
    const matchesBranch = selectedBranch === "all" || doctor.branch === selectedBranch
    return matchesSearch && matchesDepartment && matchesBranch
  })

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find a Doctor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for experienced doctors and book your appointment
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name.toLowerCase()}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Kushtia">Kushtia</SelectItem>
              <SelectItem value="Jhenaidah">Jhenaidah</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={language === "en" ? doctor.name : doctor.nameBn}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === "en" ? doctor.name : doctor.nameBn}
                  </h3>
                  <p className="text-primary font-medium">
                    {language === "en" ? doctor.specialty : doctor.specialtyBn}
                  </p>
                  <p className="text-sm text-muted-foreground">{doctor.qualification}</p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {doctor.branch} Branch
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {doctor.available.map((day) => (
                      <Badge key={day} variant="secondary" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-foreground">৳{doctor.consultationFee}</span>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/doctors/${doctor.id}`}>Profile</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/appointment?doctor=${doctor.id}`}>
                          <Calendar className="w-4 h-4 mr-1" />
                          Book
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </MainLayout>
  )
}
