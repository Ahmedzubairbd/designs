"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  LogOut,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const stats = [
  { title: "Total Appointments", value: "1,234", change: "+12%", icon: Calendar },
  { title: "Active Patients", value: "856", change: "+8%", icon: Users },
  { title: "Reports Generated", value: "2,456", change: "+15%", icon: FileText },
  { title: "Revenue", value: "৳4.5L", change: "+20%", icon: TrendingUp },
]

const recentAppointments = [
  { id: 1, patient: "Rahim Uddin", doctor: "Dr. Aminul Islam", date: "2024-11-25", status: "confirmed" },
  { id: 2, patient: "Salma Begum", doctor: "Dr. Fatima Rahman", date: "2024-11-25", status: "pending" },
  { id: 3, patient: "Abdul Karim", doctor: "Dr. Kamal Hossain", date: "2024-11-25", status: "completed" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-sidebar-primary font-bold text-xl">A</span>
            {sidebarOpen && <span className="font-semibold">Admin Panel</span>}
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
              { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
              { icon: Users, label: "Patients", href: "/admin/patients" },
              { icon: FileText, label: "Reports", href: "/admin/reports" },
              { icon: Bell, label: "Notices", href: "/admin/notices" },
              { icon: Settings, label: "Settings", href: "/admin/settings" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-sidebar-accent transition-colors text-destructive">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Appointment
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-accent">{stat.change} from last month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((apt) => (
                      <tr key={apt.id} className="border-b border-border">
                        <td className="py-3 px-4 text-foreground">{apt.patient}</td>
                        <td className="py-3 px-4 text-foreground">{apt.doctor}</td>
                        <td className="py-3 px-4 text-muted-foreground">{apt.date}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              apt.status === "confirmed"
                                ? "default"
                                : apt.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {apt.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
