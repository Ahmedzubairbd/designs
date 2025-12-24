import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { faqs } from "@/lib/mock-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-center">Still have questions?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <a href="tel:+8801234567890">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </Button>
              <Button asChild className="gap-2">
                <Link href="/contact">
                  <MessageCircle className="w-4 h-4" />
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}
