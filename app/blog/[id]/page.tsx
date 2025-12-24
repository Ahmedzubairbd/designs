import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { blogPosts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  return (
    <MainLayout>
      <article className="container mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            <p className="text-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p className="text-foreground mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Key Takeaways</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Regular health checkups are essential for early detection</li>
              <li>Maintain a balanced diet and exercise routine</li>
              <li>Consult with healthcare professionals for personalized advice</li>
              <li>Stay informed about the latest medical developments</li>
            </ul>
          </div>
        </div>
      </article>
      <Footer />
    </MainLayout>
  )
}
