import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { doctors } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, MapPin, Award, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function DoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doctor = doctors.find((d) => d.id === id)

  if (!doctor) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/doctors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
                <p className="text-primary font-medium">{doctor.specialty}</p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    {doctor.qualification}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    {doctor.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {doctor.branch} Branch
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-2">Consultation Fee</p>
                  <p className="text-2xl font-bold text-primary">৳{doctor.consultationFee}</p>
                </div>

                <Button asChild className="w-full mt-6">
                  <Link href={`/appointment?doctor=${doctor.id}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground">{doctor.about}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Available Days</h2>
                <div className="flex flex-wrap gap-2">
                  {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <Badge
                      key={day}
                      variant={doctor.available.includes(day) ? "default" : "secondary"}
                      className={doctor.available.includes(day) ? "" : "opacity-50"}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Specializations</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>General {doctor.specialty} consultations</li>
                  <li>Diagnostic evaluations</li>
                  <li>Treatment planning and management</li>
                  <li>Follow-up care and monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
