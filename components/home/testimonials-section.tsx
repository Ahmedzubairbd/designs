"use client"

import { useLanguage } from "@/contexts/language-context"
import { testimonials } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("testimonials")}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">What our patients say about us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-8 pb-6">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "{language === "en" ? testimonial.comment : testimonial.commentBn}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {language === "en" ? testimonial.name : testimonial.nameBn}
                  </p>
                  <p className="text-sm text-muted-foreground">{new Date(testimonial.date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
