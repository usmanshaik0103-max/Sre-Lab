'use client';

import { useSREStore, IncidentType, Severity } from '@/lib/sre-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, Flame, WifiOff, Cpu, Database, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChaosControl() {
  const { chaosMode, toggleChaosMode, triggerIncident, addLog, addDecision } = useSREStore();

  const injectFailure = (type: IncidentType, severity: Severity, description: string, service: string) => {
    triggerIncident({ type, severity, description, service });
    addLog(`CHAOS INJECTED: ${description}`, 'error');
    addDecision({
      decision: `Inject ${type} failure`,
      reason: 'Manual chaos testing',
      outcome: `${service} impacted by ${type}`,
      impact: 'negative'
    });
  };

  const CHAOS_EXPERIMENTS = [
    { 
      id: 'cpu_leak', 
      name: 'CPU Exhaustion', 
      icon: Cpu, 
      color: 'text-amber-500',
      action: () => injectFailure('cpu_spike', 'high', 'Sudden CPU spike in API workers', 'API-Gateway')
    },
    { 
      id: 'network_partition', 
      name: 'Network Latency', 
      icon: WifiOff, 
      color: 'text-blue-500',
      action: () => injectFailure('high_latency', 'medium', 'Cross-AZ network latency > 200ms', 'Inventory-API')
    },
    { 
      id: 'db_crash', 
      name: 'DB Termination', 
      icon: Database, 
      color: 'text-rose-500',
      action: () => injectFailure('service_down', 'critical', 'Master Database instance terminated', 'Inventory-DB')
    },
    { 
      id: 'pod_crash', 
      name: 'OOM Killer', 
      icon: Flame, 
      color: 'text-orange-500',
      action: () => injectFailure('pod_crash', 'high', 'Memory leak caused OOM on worker nodes', 'Auth-Service')
    },
  ];

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800 mb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <Zap className="w-4 h-4 text-purple-500" />
            CHAOS ENGINEERING LAB
          </CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="chaos-mode" className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Auto Chaos</Label>
            <Switch 
              id="chaos-mode" 
              checked={chaosMode} 
              onCheckedChange={toggleChaosMode} 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {CHAOS_EXPERIMENTS.map((exp) => (
            <Button
              key={exp.id}
              variant="outline"
              className="h-auto py-3 px-4 flex flex-col items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
              onClick={exp.action}
            >
              <exp.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", exp.color)} />
              <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-600 dark:text-zinc-400">
                {exp.name}
              </span>
            </Button>
          ))}
        </div>

        <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-purple-500 uppercase">SRE Safe Learning</h4>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Chaos Engineering isn't about breaking things in production; it's about <strong>building confidence</strong> in the system's ability to withstand turbulent conditions. Inject a failure to test your alerts and runbooks.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
