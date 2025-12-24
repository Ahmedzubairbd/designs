"use client"

import { useLanguage } from "@/contexts/language-context"
import { blogPosts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function NewsSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("latestNews")}</h2>
            <p className="text-muted-foreground mt-2">Stay updated with health tips and medical insights</p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex bg-transparent">
            <Link href="/blog">
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={language === "en" ? post.title : post.titleBn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`}>{language === "en" ? post.title : post.titleBn}</Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {language === "en" ? post.excerpt : post.excerptBn}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button asChild variant="outline">
            <Link href="/blog">
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
