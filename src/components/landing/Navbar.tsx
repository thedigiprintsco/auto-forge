import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-deep-space/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="EtherForge Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold tracking-tighter text-white font-display">EtherForge</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-silver-slate">
          <Link href="#philosophy" className="hover:text-primary transition-colors">Philosophy</Link>
          <Link href="#bundles" className="hover:text-primary transition-colors">Bundles</Link>
          <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="text-silver-slate hover:text-white hover:bg-white/5">
              Sign In
            </Button>
          </Link>
          <Link href="#bundles">
            <Button className="bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer">
              Explore the Forge
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
