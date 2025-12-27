'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  Flame, 
  ZapOff, 
  ShieldAlert, 
  Database,
  Cpu,
  Globe,
  Activity,
  Server,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SERVICES = [
  { id: 'cdn', name: 'Global CDN', type: 'ingress', icon: Globe, x: 10, y: 50, deps: ['lb'] },
  { id: 'lb', name: 'Load Balancer', type: 'network', icon: Activity, x: 25, y: 50, deps: ['api'] },
  { id: 'api', name: 'API Gateway', type: 'app', icon: Shield, x: 45, y: 50, deps: ['auth', 'order'] },
  { id: 'auth', name: 'Auth Service', type: 'app', icon: Server, x: 65, y: 25, deps: ['db'] },
  { id: 'order', name: 'Order Service', type: 'app', icon: Server, x: 65, y: 75, deps: ['db', 'payment'] },
  { id: 'db', name: 'Main DB', type: 'storage', icon: Database, x: 85, y: 40, deps: [] },
  { id: 'payment', name: 'Payment API', type: 'external', icon: Globe, x: 85, y: 80, deps: [] },
];

export function SystemTopology() {
  const { 
    chaosMode, 
    toggleChaosMode, 
    addLog, 
    triggerIncident, 
    incidents,
    teachingMode
  } = useSREStore();

  const activeIncidentServices = incidents
    .filter(i => i.status !== 'resolved')
    .map(i => i.service.toLowerCase());

  const getServiceStatus = (serviceName: string) => {
    const isAffected = activeIncidentServices.some(s => 
      s.includes(serviceName.toLowerCase()) || 
      (serviceName === 'Main DB' && s.includes('db')) ||
      (serviceName === 'API Gateway' && s.includes('api'))
    );
    return isAffected ? 'error' : 'healthy';
  };

  const injectFailure = (type: string) => {
    addLog(`CHAOS: Injecting ${type} into cluster...`, 'warn');
    
    switch(type) {
      case 'latency':
        triggerIncident({
          type: 'high_latency',
          severity: 'high',
          description: 'Simulated network congestion across availability zones',
          service: 'Load Balancer'
        });
        break;
      case 'crash':
        triggerIncident({
          type: 'pod_crash',
          severity: 'critical',
          description: 'Random pod eviction triggered by chaos engine',
          service: 'Auth Service'
        });
        break;
      case 'db':
        triggerIncident({
          type: 'db_exhaustion',
          severity: 'high',
          description: 'Connection pool saturation simulation',
          service: 'Main DB'
        });
        break;
    }
  };

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-500" />
            Infrastructure Dependency Graph
          </h3>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase font-bold tracking-tighter">Real-time Service Health & Blast Radius</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={chaosMode ? "destructive" : "outline"} className={cn(
            "text-[9px] font-bold px-2 py-0.5 border-none",
            chaosMode ? "bg-rose-500 text-white animate-pulse" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
          )}>
            {chaosMode ? 'CHAOS ACTIVE' : 'SAFE MODE'}
          </Badge>
          <Button 
            size="sm" 
            variant={chaosMode ? "destructive" : "outline"}
            className="h-7 text-[10px] font-bold uppercase tracking-widest px-3 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800"
            onClick={toggleChaosMode}
          >
            {chaosMode ? 'Stop Chaos' : 'Enable Chaos'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Topology Map */}
        <div className="lg:col-span-8 relative min-h-[400px] lg:h-[450px] bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 overflow-hidden p-6 flex flex-col group">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-zinc-300 dark:text-zinc-800" />
              </marker>
            </defs>
            {SERVICES.map(service => 
              service.deps.map(depId => {
                const dep = SERVICES.find(s => s.id === depId);
                if (!dep) return null;
                
                const isAffected = getServiceStatus(service.name) !== 'healthy' || getServiceStatus(dep.name) !== 'healthy';
                
                return (
                  <motion.line
                    key={`${service.id}-${depId}`}
                    x1={`${service.x}%`}
                    y1={`${service.y}%`}
                    x2={`${dep.x}%`}
                    y2={`${dep.y}%`}
                    stroke="currentColor"
                    strokeWidth={isAffected ? 2 : 1}
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isAffected ? 1 : 0.5,
                      stroke: isAffected ? '#f43f5e' : '#27272a',
                      strokeDasharray: isAffected ? '4 2' : 'none'
                    }}
                    className={cn(
                      "transition-colors duration-500",
                      isAffected ? "text-rose-500" : "text-zinc-300 dark:text-zinc-800"
                    )}
                  />
                );
              })
            )}
          </svg>

          <div className="relative flex-1">
            {SERVICES.map((svc, i) => {
              const status = getServiceStatus(svc.name);
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ left: `${svc.x}%`, top: `${svc.y}%` }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 z-10 w-28 p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all cursor-default bg-white dark:bg-zinc-900",
                    status === 'error' 
                      ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] bg-rose-500/5" 
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-md",
                    status === 'error' ? "bg-rose-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  )}>
                    <svc.icon className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-zinc-900 dark:text-zinc-200 leading-tight truncate w-full">{svc.name}</p>
                    <p className="text-[7px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">{svc.type}</p>
                  </div>

                  {status === 'error' && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1.5 -right-1.5"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-500 fill-white dark:fill-black" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-4 flex gap-4 bg-white/80 dark:bg-zinc-950/80 p-2 rounded-lg backdrop-blur-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Healthy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Incident</span>
            </div>
          </div>
        </div>

        {/* Chaos Injection Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800/50">
            <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Flame className="w-3 h-3 text-rose-500" />
              Chaos Experiments
            </h4>
            
            <div className="space-y-2">
              <ChaosButton 
                label="Inject Latency" 
                desc="Add 500ms delay to network"
                onClick={() => injectFailure('latency')}
                disabled={!chaosMode}
              />
              <ChaosButton 
                label="Kill Auth Pods" 
                desc="Simulate service crashing"
                onClick={() => injectFailure('crash')}
                disabled={!chaosMode}
              />
              <ChaosButton 
                label="Saturate DB" 
                desc="Exhaust connection pool"
                onClick={() => injectFailure('db')}
                disabled={!chaosMode}
              />
            </div>

            {!chaosMode && (
              <div className="mt-4 p-3 rounded bg-amber-500/5 border border-amber-500/10">
                <p className="text-[9px] text-amber-600 dark:text-amber-500/80 font-medium leading-tight">
                  Chaos Mode is disabled. Enable it to run reliability experiments.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Architecture Insights</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500">Service Count</span>
                <span className="font-bold">{SERVICES.length}</span>
              </div>
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500">Edge Node</span>
                <span className="font-bold text-emerald-500 uppercase">CDN (v1.2)</span>
              </div>
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500">DB Status</span>
                <span className={cn("font-bold uppercase", getServiceStatus('Main DB') === 'healthy' ? "text-emerald-500" : "text-rose-500")}>
                  {getServiceStatus('Main DB').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {teachingMode && (
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">SRE Pro Tip</h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Visualizing dependencies helps identify the <strong>Blast Radius</strong> of an outage. If the DB fails, every service above it in the graph will eventually break.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function ChaosButton({ label, desc, onClick, disabled }: { label: string, desc: string, onClick: () => void, disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all group",
        disabled 
          ? "bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600" 
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-rose-500/5"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors uppercase tracking-wider">{label}</p>
          <p className="text-[9px] text-zinc-500 mt-0.5">{desc}</p>
        </div>
        <ZapOff className={cn("w-3 h-3 transition-colors", disabled ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-400 dark:text-zinc-600 group-hover:text-rose-500")} />
      </div>
    </button>
  );
}
