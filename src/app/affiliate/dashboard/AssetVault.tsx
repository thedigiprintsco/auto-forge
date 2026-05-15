'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink, Share2, FileText, Image as ImageIcon } from 'lucide-react'

const assets = [
  {
    title: 'Powered by EF',
    image: '/affiliate/share-powered-by-ef.png',
    description: 'High-impact brand awareness creative for X and LinkedIn.',
  },
  {
    title: 'Join the Forge',
    image: '/affiliate/share-join-the-forge.png',
    description: 'Recruitment-focused creative for affiliate lead generation.',
  },
  {
    title: 'Scale Income',
    image: '/affiliate/share-scale-income.png',
    description: 'Creative highlighting the passive income potential.',
  }
]

export default function AssetVault() {
  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = imageUrl.split('/').pop() || 'asset.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBrandKitDownload = () => {
    window.location.href = '/affiliate/etherforge-brand-kit.zip'
  }

  return (
    <section className="mt-12 animate-in fade-in duration-1000 delay-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display">Marketing Asset Vault</h2>
          <p className="text-sm text-silver-slate">Premium creatives engineered for conversion.</p>
        </div>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleBrandKitDownload}
          className="border-ai-teal/20 text-ai-teal hover:bg-ai-teal/10 hover:border-ai-teal/40 rounded-2xl px-6"
        >
          <Download className="h-4 w-4 mr-2" /> Download Brand Kit (ZIP)
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {assets.map((asset) => (
          <div 
            key={asset.title} 
            className="group bg-forge-gray/30 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-electric-blue/50 shadow-2xl"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-black/40 border-b border-white/5">
              <Image 
                src={asset.image} 
                alt={asset.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                 <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 text-white rounded-xl px-4 py-5 font-bold"
                    onClick={() => window.open(asset.image, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 text-ai-teal" /> Preview Full Res
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-5 font-bold shadow-lg"
                    onClick={() => handleDownload(asset.image)}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download PNG
                  </Button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex items-center gap-2">
                   <div className="bg-ai-teal/20 backdrop-blur-md p-2 rounded-lg border border-ai-teal/30">
                      <ImageIcon className="h-4 w-4 text-ai-teal" />
                   </div>
                   <span className="text-xs font-bold text-white uppercase tracking-widest">{asset.title}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-sm text-silver-slate mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
                {asset.description}
              </p>
              
              <div className="space-y-4">
                <div className="h-px w-full bg-white/5" />
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  <span>Available Formats</span>
                  <span className="text-ai-teal">Ready to Ship</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <FormatButton label="Square" icon={<ImageIcon className="h-3 w-3" />} />
                  <FormatButton label="Vertical" icon={<ImageIcon className="h-3 w-3" />} />
                  <FormatButton label="Story" icon={<ImageIcon className="h-3 w-3" />} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Copy Assets Section */}
      <div className="mt-12 p-8 md:p-10 bg-gradient-to-br from-forge-gray/40 to-black/40 border border-white/5 rounded-[40px] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <FileText size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-3">
            <FileText className="h-5 w-5 text-electric-blue" />
            Ad Copy & Hooks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-black/30 border border-white/5 space-y-4 group/copy hover:border-electric-blue/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Platform: X / Threads</span>
                <Button variant="ghost" size="sm" className="h-8 text-zinc-500 hover:text-ai-teal">
                  <Share2 className="h-3 w-3 mr-2" /> Copy
                </Button>
              </div>
              <p className="text-sm text-silver-slate italic leading-relaxed">
                "Stop paying for 5+ SaaS subscriptions. I built my entire one-person empire on EtherForge systems. ⚒️\n\nScale faster. Work less. Link below."
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-black/30 border border-white/5 space-y-4 group/copy hover:border-electric-blue/30 transition-colors">
               <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Platform: LinkedIn</span>
                <Button variant="ghost" size="sm" className="h-8 text-zinc-500 hover:text-ai-teal">
                  <Share2 className="h-3 w-3 mr-2" /> Copy
                </Button>
              </div>
              <p className="text-sm text-silver-slate italic leading-relaxed">
                "Digital autonomy is the new wealth. EtherForge is providing the infrastructure for the next generation of solopreneurs. Proud to be a Forge Elite partner."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormatButton({ label, icon }: { label: string, icon: React.ReactNode }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all group/fmt">
      <div className="text-zinc-600 group-hover/fmt:text-ai-teal transition-colors">
        {icon}
      </div>
      <span className="text-[9px] font-bold text-zinc-500 group-hover/fmt:text-white uppercase tracking-wider">{label}</span>
    </button>
  )
}
