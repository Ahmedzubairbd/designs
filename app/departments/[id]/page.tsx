import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { departments, doctors } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function DepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const department = departments.find((d) => d.id === id)

  if (!department) {
    notFound()
  }

  const deptDoctors = doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(department.name.toLowerCase().split(" ")[0].toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/departments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Departments
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
            <Image src={department.image || "/placeholder.svg"} alt={department.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{department.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{department.description}</p>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Services Offered:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Comprehensive consultations</li>
                <li>Diagnostic testing</li>
                <li>Treatment planning</li>
                <li>Follow-up care</li>
                <li>Emergency services</li>
              </ul>
            </div>
            <Button asChild className="mt-6">
              <Link href="/appointment">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </div>
        </div>

        {deptDoctors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Doctors in this Department</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doctor.qualification}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                      <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </MainLayout>
  )
}
