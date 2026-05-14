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
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AIForge() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

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
    addLog(`Initiating forge for niche: "${prompt}"...`)
    
    try {
      const response = await fetch('/api/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: prompt, type: 'notion' }) // Default to notion for now
      })
      
      const result = await response.json()
      
      if (result.success) {
        addLog(`Product "${result.data.title}" generated successfully!`, 'success')
        addLog(`Price set to ${result.data.price}. Ready for review.`)
      } else {
        addLog(`Forge error: ${result.error || 'Unknown error'}`, 'error')
      }
    } catch (err) {
      addLog(`System failure: ${err instanceof Error ? err.message : 'Unknown connection error'}`, 'error')
    } finally {
      setIsGenerating(false)
      setPrompt('')
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
        {/* Command Center */}
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
            <div className="bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
              <Globe className="h-5 w-5 text-zinc-500 mb-2" />
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Research</span>
              <span className="text-xs font-medium text-white mt-1">Idle</span>
            </div>
            <div className="bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center border-ai-teal/20 bg-ai-teal/5">
              <Database className="h-5 w-5 text-ai-teal mb-2" />
              <span className="text-[10px] text-ai-teal uppercase font-bold">Assets</span>
              <span className="text-xs font-medium text-white mt-1">{isGenerating ? 'In Progress' : 'Ready'}</span>
            </div>
            <div className="bg-forge-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
              <CheckCircle2 className="h-5 w-5 text-zinc-500 mb-2" />
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Deployment</span>
              <span className="text-xs font-medium text-white mt-1">Idle</span>
            </div>
          </div>
        </div>

        {/* Console / Log Output */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 font-mono text-sm relative flex flex-col h-[500px]">
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
                <span className={log.type === 'success' ? 'text-ai-teal' : 'text-silver-slate'}>
                  {log.type === 'success' ? '✓ ' : '• '}{log.message}
                </span>
              </div>
            ))}
            {isGenerating && (
              <>
                <div className="flex gap-4 animate-pulse">
                  <span className="text-zinc-700 shrink-0">[10:05:12]</span>
                  <span className="text-ai-teal"> forging assets... analyzing target audience...</span>
                </div>
                <div className="flex gap-4 animate-pulse delay-150">
                  <span className="text-zinc-700 shrink-0">[10:05:14]</span>
                  <span className="text-primary"> generating high-conversion sales copy...</span>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600">
            <span>UPTIME: 14:02:44</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ai-teal animate-ping" />
              SYSTEM ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
