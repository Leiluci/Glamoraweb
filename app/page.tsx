'use client'

import SiteLayout from '@/components/layout/SiteLayout'
import HeroSection from '@/components/home/HeroSection'
import FeaturesStrip from '@/components/home/FeaturesStrip'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import BannerSection from '@/components/home/BannerSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <FeaturesStrip />
      <CategoriesSection />
      <FeaturedProducts />
      <BannerSection />
      <TestimonialsSection />
      <NewsletterSection />
    </SiteLayout>
  )
}
