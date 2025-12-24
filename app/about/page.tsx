import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Building2, Target, Heart } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Clock, value: "22+", label: "Years of Service" },
  { icon: Users, value: "500K+", label: "Patients Served" },
  { icon: Award, value: "50+", label: "Expert Doctors" },
  { icon: Building2, value: "2", label: "Branches" },
]

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "We prioritize the well-being and comfort of our patients in every interaction.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in diagnostic accuracy and medical care.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously adopt the latest medical technologies and practices.",
  },
]

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Amin Diagnostic & Medical Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            One of the oldest and most trusted diagnostic centers in the greater Kushtia area, serving our community
            with dedication and excellence for over 22 years.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
            <Image src="/hospital-building-exterior-modern.jpg" alt="Amin Diagnostic Building" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2002, Amin Diagnostic & Medical Services began with a simple mission: to provide quality
              healthcare services to the people of Kushtia and surrounding areas.
            </p>
            <p className="text-muted-foreground mb-4">
              Over the past two decades, we have grown from a small diagnostic center to a comprehensive medical
              facility with two branches serving Kushtia and Jhenaidah districts.
            </p>
            <p className="text-muted-foreground">
              Today, we are proud to offer a wide range of diagnostic services, specialist consultations, and medical
              treatments, all while maintaining our commitment to affordable and accessible healthcare.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="opacity-90">
                To provide accurate, timely, and affordable diagnostic services and medical care to all members of our
                community, utilizing the latest technology and expertise while maintaining the highest standards of
                quality and patient satisfaction.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-accent text-accent-foreground">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="opacity-90">
                To be the most trusted healthcare provider in the region, known for excellence in diagnostics, patient
                care, and medical innovation, while expanding our reach to serve more communities in need.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Core Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Infrastructure */}
        <div className="bg-secondary/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Infrastructure</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Modern Equipment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Services</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Diagnostic Tests</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
