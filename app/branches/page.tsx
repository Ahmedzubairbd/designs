import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { branches } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function BranchesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Branches</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at our convenient locations in Kushtia and Jhenaidah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((branch) => (
            <Card key={branch.id} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={branch.image || "/placeholder.svg"} alt={branch.name} fill className="object-cover" />
                {branch.hours === "24/7" && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">24/7 Open</Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">{branch.name}</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a href={`tel:${branch.phone}`} className="text-muted-foreground hover:text-primary">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href={`mailto:${branch.email}`} className="text-muted-foreground hover:text-primary">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{branch.hours}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Available Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {branch.services.map((service, idx) => (
                      <Badge key={idx} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full gap-2">
                  <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4" />
                    View on Map
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
