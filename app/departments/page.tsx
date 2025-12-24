import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { departments } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DepartmentsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Departments</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our specialized departments offering comprehensive healthcare services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <Card key={dept.id} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dept.image || "/placeholder.svg"}
                  alt={dept.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{dept.name}</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{dept.description}</p>
                <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                  <Link href={`/departments/${dept.id}`}>
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
