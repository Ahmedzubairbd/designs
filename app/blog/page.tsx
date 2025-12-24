import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { blogPosts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Health Blog & News</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest health tips, medical insights, and news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
