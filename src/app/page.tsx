import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Philosophy from '@/components/landing/Philosophy'
import Bundles from '@/components/landing/Bundles'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-space text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Bundles />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
