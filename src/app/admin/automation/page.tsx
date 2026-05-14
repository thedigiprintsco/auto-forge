'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Share2, 
  Sparkles, 
  Terminal as TerminalIcon, 
  Send,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BufferProfile {
  id: string
  service: string
  service_username: string
}

export default function AutomationDashboard() {
  const [isTriggering, setIsTriggering] = useState(false)
  const [profiles, setProfiles] = useState<BufferProfile[]>([])
  const [selectedProfileId, setSelectedProfileId] = useState<string>('')
  
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', message: 'Automation engine initialized. Connected to Social Forge.', time: new Date().toLocaleTimeString() },
  ])

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev, { 
      id: Date.now(), 
      type, 
      message, 
      time: new Date().toLocaleTimeString() 
    }])
  }, [])

  const fetchProfiles = useCallback(async () => {
    addLog('Fetching connected Buffer profiles...')
    try {
      const response = await fetch('/api/automation/social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_profiles' })
      })
      
      const data = await response.json()
      if (data.profiles) {
        setProfiles(data.profiles)
        if (data.profiles.length > 0) {
          setSelectedProfileId(data.profiles[0].id)
        }
        addLog(`Successfully retrieved ${data.profiles.length} profiles.`, 'success')
      } else {
        const mockProfiles = [
          { id: 'mock_x', service: 'twitter', service_username: 'EtherForge_AI' },
          { id: 'mock_li', service: 'linkedin', service_username: 'EtherForge' }
        ]
        setProfiles(mockProfiles)
        setSelectedProfileId(mockProfiles[0].id)
        addLog('Using mock profiles for prototype display.', 'info')
      }
    } catch (err) {
      addLog('Failed to fetch profiles. Check Buffer API configuration.', 'error')
    }
  }, [addLog])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfiles()
  }, [fetchProfiles])

  const handleTriggerPost = async () => {
    setIsTriggering(true)
    addLog(`Initiating autonomous social post for selected profile...`)
    
    try {
      const response = await fetch('/api/automation/social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          isTest: true, 
          testProfileId: selectedProfileId 
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        addLog(`Successfully sent post for "${result.product}" to Buffer!`, 'success')
        addLog(`Buffer Response: ${result.message}`)
      } else {
        addLog(`Automation error: ${result.message || result.error || 'Unknown error'}`, 'error')
        if (result.message?.includes('placeholder')) {
          addLog('Action Required: Update BUFFER_ACCESS_TOKEN in .env.local', 'info')
        }
      }
    } catch (err) {
      addLog(`System failure: ${err instanceof Error ? err.message : 'Unknown connection error'}`, 'error')
    } finally {
      setIsTriggering(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-2">
          <Share2 className="h-3 w-3" />
          Social Forge Automation
        </div>
        <h1 className="text-4xl font-black font-display tracking-tight text-white">
          The <span className="text-primary">Social Forge</span>
        </h1>
        <p className="text-silver-slate text-lg max-w-2xl mx-auto">
          Scale your reach autonomously. The Social Forge selects products, generates high-conversion copy, and schedules posts via Buffer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-ai-teal" />
              Manual Override
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Select Target Profile
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => setSelectedProfileId(profile.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedProfileId === profile.id 
                          ? 'bg-primary/10 border-primary/40 text-white' 
                          : 'bg-deep-space/40 border-white/5 text-silver-slate hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          profile.service === 'twitter' ? 'bg-black' : 'bg-blue-600'
                        }`}>
                          <Share2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold">{profile.service_username}</p>
                          <p className="text-[10px] uppercase text-zinc-500">{profile.service}</p>
                        </div>
                      </div>
                      {selectedProfileId === profile.id && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleTriggerPost}
                  disabled={isTriggering || !selectedProfileId}
                  className="w-full bg-primary text-white hover:bg-primary/90 font-black py-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                >
                  {isTriggering ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      EXECUTING SOCIAL FORGE...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      TRIGGER AUTONOMOUS POST
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Integration Status */}
          <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-zinc-500" />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-silver-slate">Buffer API Connection</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-silver-slate">Product Catalog Sync</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  SYNCED
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-silver-slate">Next Scheduled Run</span>
                <span className="text-[10px] font-bold text-primary">TOMORROW 09:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Console */}
        <div className="flex flex-col">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 font-mono text-sm relative flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-silver-slate uppercase tracking-widest">Automation Console</span>
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
                  <span className={log.type === 'success' ? 'text-green-400' : log.type === 'error' ? 'text-red-500' : 'text-silver-slate'}>
                    {log.type === 'success' ? '✓ ' : log.type === 'error' ? '⨯ ' : '• '}{log.message}
                  </span>
                </div>
              ))}
              {isTriggering && (
                <div className="flex gap-4 animate-pulse">
                  <span className="text-zinc-700 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-primary"> forger working...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
