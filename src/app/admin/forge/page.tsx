'use client'

import { useState } from 'react'
import { 
  Zap, 
  Sparkles, 
  Terminal as TerminalIcon, 
  Cpu, 
  Database, 
  Globe, 
  CheckCircle2,
  Loader2,
  Send,
  Plus,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GeneratedProduct {
  title: string
  value_prop: string
  description: string
  price: number
  type: string
  features: string[]
  content_preview: {
    structure?: string[]
    sample_content?: string
  }
}

export default function AIForge() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [generatedProduct, setGeneratedProduct] = useState<GeneratedProduct | null>(null)
  const [saved, setSaved] = useState(false)

  const [logs, setLogs] = useState([
    { id: 1, type: 'info', message: 'Forge engine initialized. Standby for command.', time: new Date().toLocaleTimeString() },
  ])

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev, { 
      id: Date.now(), 
      type, 
      message, 
      time: new Date().toLocaleTimeString() 
    }])
  }

  const handleForge = async () => {
    if (!prompt) return
    setIsGenerating(true)
    setGeneratedProduct(null)
    setSaved(false)
    addLog(`Initiating forge for niche: "${prompt}"...`)
    
    try {
      const response = await fetch('/api/admin/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: prompt, type: 'notion', action: 'generate' })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setGeneratedProduct(result.data)
        addLog(`Product "${result.data.title}" generated successfully!`, 'success')
        addLog(`Price set to $${result.data.price}. Assets compiled and ready.`)
      } else {
        addLog(`Forge error: ${result.error || 'Unknown error'}`, 'error')
      }
    } catch (err) {
      addLog(`System failure: ${err instanceof Error ? err.message : 'Unknown connection error'}`, 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedProduct) return
    setIsSaving(true)
    addLog('Committing product to database...')
    
    try {
      const response = await fetch('/api/admin/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', productData: generatedProduct })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSaved(true)
        addLog(`Product "${generatedProduct.title}" successfully added to store as DRAFT.`, 'success')
      } else {
        addLog(`Save error: ${result.error || 'Unknown error'}`, 'error')
      }
    } catch (err) {
      addLog(`Database failure: ${err instanceof Error ? err.message : 'Unknown connection error'}`, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-teal/10 border border-ai-teal/20 text-ai-teal text-xs font-bold tracking-widest uppercase mb-2">
          <Sparkles className="h-3 w-3" />
          Autonomous Product Engine
        </div>
        <h1 className="text-4xl font-black font-display tracking-tight text-white">
          The <span className="text-ai-teal">AI Forge</span>
        </h1>
        <p className="text-silver-slate text-lg max-w-2xl mx-auto">
          Input a niche or a problem statement. The Forge will design the product, write the copy, and prepare the digital delivery assets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Command & Progress */}
        <div className="space-y-6">
          <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="h-24 w-24 text-ai-teal" />
            </div>
            
            <label className="block text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              FORGE COMMAND
            </label>
            
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Generate a Notion-based operating system for high-ticket coaching businesses including client onboarding and progress tracking."
              className="w-full bg-deep-space/50 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-ai-teal/30 h-40 resize-none transition-all"
            />
            
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-silver-slate uppercase font-bold tracking-tighter">Model: Claude-3</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-silver-slate uppercase font-bold tracking-tighter">Style: Premium</span>
              </div>
              <Button 
                onClick={handleForge}
                disabled={isGenerating || !prompt}
                className="bg-ai-teal text-deep-space hover:bg-ai-teal/90 font-black px-6 py-5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.2)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    FORGING...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    TRIGGER FORGE
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all ${isGenerating ? 'border-primary/20 bg-primary/5 animate-pulse' : ''}`}>
              <Globe className={`h-5 w-5 mb-2 ${isGenerating ? 'text-primary' : 'text-zinc-500'}`} />
              <span className={`text-[10px] uppercase font-bold ${isGenerating ? 'text-primary' : 'text-zinc-500'}`}>Research</span>
              <span className="text-xs font-medium text-white mt-1">{isGenerating ? 'Analyzing' : generatedProduct ? 'Complete' : 'Idle'}</span>
            </div>
            <div className={`bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all ${isGenerating ? 'border-ai-teal/20 bg-ai-teal/5 animate-pulse' : generatedProduct ? 'border-ai-teal/20 bg-ai-teal/5' : ''}`}>
              <Database className={`h-5 w-5 mb-2 ${isGenerating || generatedProduct ? 'text-ai-teal' : 'text-zinc-500'}`} />
              <span className={`text-[10px] uppercase font-bold ${isGenerating || generatedProduct ? 'text-ai-teal' : 'text-zinc-500'}`}>Assets</span>
              <span className="text-xs font-medium text-white mt-1">{isGenerating ? 'Synthesizing' : generatedProduct ? 'Ready' : 'Idle'}</span>
            </div>
            <div className={`bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all ${saved ? 'border-green-500/20 bg-green-500/5' : ''}`}>
              <CheckCircle2 className={`h-5 w-5 mb-2 ${saved ? 'text-green-500' : 'text-zinc-500'}`} />
              <span className={`text-[10px] uppercase font-bold ${saved ? 'text-green-500' : 'text-zinc-500'}`}>Deployment</span>
              <span className="text-xs font-medium text-white mt-1">{isSaving ? 'Saving...' : saved ? 'Committed' : 'Idle'}</span>
            </div>
          </div>

          {/* Console / Log Output */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 font-mono text-sm relative flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-ai-teal" />
                <span className="text-xs font-bold text-silver-slate uppercase tracking-widest">Forge Console Output</span>
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <span className="text-zinc-700 shrink-0">[{log.time}]</span>
                  <span className={log.type === 'success' ? 'text-ai-teal' : log.type === 'error' ? 'text-red-500' : 'text-silver-slate'}>
                    {log.type === 'success' ? '✓ ' : log.type === 'error' ? '⨯ ' : '• '}{log.message}
                  </span>
                </div>
              ))}
              {isGenerating && (
                <div className="flex gap-4 animate-pulse">
                  <span className="text-zinc-700 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-ai-teal"> working...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Save */}
        <div className="space-y-6">
          {generatedProduct ? (
            <div className="bg-forge-gray/50 border border-ai-teal/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="absolute top-0 right-0 p-6">
                <div className="px-3 py-1 rounded-full bg-ai-teal text-deep-space text-[10px] font-black uppercase tracking-widest">
                  Preview
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black font-display text-white">{generatedProduct.title}</h3>
                  <p className="text-ai-teal font-bold mt-1 uppercase text-xs tracking-widest">{generatedProduct.type}</p>
                </div>
                
                <p className="text-silver-slate leading-relaxed">
                  {generatedProduct.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Price Point</span>
                    <span className="text-2xl font-black text-white">${generatedProduct.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Target Niche</span>
                    <span className="text-sm font-medium text-white truncate block">{prompt}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-3">Key Features</span>
                  <div className="space-y-2">
                    {generatedProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-silver-slate">
                        <Check className="h-3 w-3 text-ai-teal" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleSave}
                  disabled={isSaving || saved}
                  className={`w-full py-8 text-lg font-black transition-all ${saved ? 'bg-green-500 hover:bg-green-500 cursor-default' : 'bg-primary text-white hover:bg-primary/90'}`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      COMMITTING...
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      ADDED TO STORE
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      ADD TO STORE AS DRAFT
                    </>
                  )}
                </Button>
                
                {saved && (
                  <p className="text-center text-xs text-green-500/80 font-medium">
                    Product is now available in your management dashboard.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
              <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-zinc-500 mb-2">No Product Generated</h3>
              <p className="text-zinc-600 max-w-xs text-sm">
                Enter a niche in the command center and trigger the forge to see your AI-generated product here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
