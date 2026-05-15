import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Terms of Service | EtherForge',
  description: 'The rules of the game at EtherForge.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-deep-space text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-silver-slate">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the EtherForge website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Digital Products</h2>
            <p>All products sold on EtherForge are digital downloads. Due to the nature of digital content, all sales are final. No refunds will be issued once the download link has been provided, except where required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. License for Use</h2>
            <p>When you purchase a product from EtherForge, we grant you a non-exclusive, non-transferable license to use the content for your personal or business use. You may not resell, redistribute, or sub-license our products unless explicitly stated otherwise in the product description.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and digital products, is the property of EtherForge and is protected by copyright and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>EtherForge shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our products or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our website at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or our business interests.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which EtherForge operates, without regard to its conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at support@etherforge.io.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
