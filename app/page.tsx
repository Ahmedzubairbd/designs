import { MainLayout } from "@/components/layout/main-layout"
import { HeroSection } from "@/components/home/hero-section"
import { HospitalBannersSlider } from "@/components/home/hospital-banners-slider"
import { ServicesSection } from "@/components/home/services-section"
import { TestPackagesSection } from "@/components/home/test-packages-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsSection } from "@/components/home/news-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <HospitalBannersSlider />
      <ServicesSection />
      <TestPackagesSection />
      <TestimonialsSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </MainLayout>
  )
}
