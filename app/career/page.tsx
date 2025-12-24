import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { careers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Calendar, ArrowRight } from "lucide-react"

export default function CareerPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Career Opportunities</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our team and make a difference in healthcare
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {careers.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Posted: {new Date(job.posted).toLocaleDateString()}
                      </div>
                    </div>
                    <Button className="gap-2 shrink-0">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-center">Don't see a suitable position?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button variant="outline">Submit Your Resume</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
