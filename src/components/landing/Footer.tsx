import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep-space py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt="EtherForge Logo"
              width={24}
              height={24}
              className="opacity-50 grayscale hover:grayscale-0 transition-all"
            />
            <span className="text-lg font-semibold tracking-tighter text-zinc-500 font-display">EtherForge</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <Link href="/affiliate/signup" className="hover:text-white">Affiliate Program</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="mailto:support@etherforge.io" className="hover:text-white">Contact</Link>
            <Link href="https://x.com/etherforge" className="hover:text-white">X (Twitter)</Link>
          </div>
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Ether Forge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
