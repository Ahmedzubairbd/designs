"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Clock, Download } from "lucide-react"
import Link from "next/link"

const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Aminul Islam",
    specialty: "Cardiology",
    date: "2024-11-28",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Fatima Rahman",
    specialty: "Gynecology",
    date: "2024-11-15",
    time: "2:30 PM",
    status: "completed",
  },
]

const mockReports = [
  { id: 1, name: "Complete Blood Count", date: "2024-11-10", status: "ready" },
  { id: 2, name: "Lipid Profile", date: "2024-11-08", status: "ready" },
  { id: 3, name: "Thyroid Function Test", date: "2024-11-20", status: "pending" },
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Manage your appointments and reports.</p>
          </div>
          <Button asChild>
            <Link href="/appointment">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Test Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                My Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.date} at {apt.time}
                      </p>
                    </div>
                    <Badge variant={apt.status === "upcoming" ? "default" : "secondary"}>{apt.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                My Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === "ready" ? "default" : "secondary"}>{report.status}</Badge>
                      {report.status === "ready" && (
                        <Button size="icon" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
