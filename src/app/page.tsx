import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Philosophy from '@/components/landing/Philosophy'
import Bundles from '@/components/landing/Bundles'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import Chatbot from '@/components/landing/Chatbot'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('price_cents', { ascending: false })

  return (
    <main className="min-h-screen bg-deep-space text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Bundles initialProducts={products || []} />
      <Testimonials />
      <FAQ />
      <Footer />
      <Chatbot />
    </main>
  )
}
