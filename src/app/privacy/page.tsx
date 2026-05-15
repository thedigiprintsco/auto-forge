import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Privacy Policy | EtherForge',
  description: 'How we handle your data at EtherForge.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-deep-space text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-silver-slate">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>At EtherForge, we collect information to provide better services to all our users. The types of information we collect include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identification Information:</strong> Name, email address, and billing information provided during checkout.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, collected through analytics tools like Google Analytics and PostHog.</li>
              <li><strong>Transaction Data:</strong> Details about payments you make through our platform, processed securely by Stripe.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your digital products.</li>
              <li>To provide customer support and respond to your inquiries.</li>
              <li>To improve our website performance and user experience.</li>
              <li>To send you updates and marketing communications (with your consent).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal data. We share information only with trusted third-party services necessary for our business operations, such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stripe:</strong> For payment processing.</li>
              <li><strong>Resend:</strong> For email delivery.</li>
              <li><strong>Google Analytics / PostHog:</strong> For website usage analysis.</li>
              <li><strong>Supabase:</strong> For database and authentication services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
            <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, please contact us at support@etherforge.io.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@etherforge.io.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
