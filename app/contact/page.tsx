"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { branches } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent successfully! We will get back to you soon.")
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {branches.map((branch) => (
              <Card key={branch.id}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">{branch.name}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${branch.phone}`} className="text-muted-foreground hover:text-primary">
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <a href={`mailto:${branch.email}`} className="text-muted-foreground hover:text-primary">
                        {branch.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{branch.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Emergency Hotline</h3>
                <a href="tel:+8801234567890" className="text-2xl font-bold">
                  +880 1234-567890
                </a>
                <p className="text-sm opacity-90 mt-2">Available 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
