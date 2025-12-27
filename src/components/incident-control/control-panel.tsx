'use client';

import { useSREStore, IncidentType } from '@/lib/sre-store';
import { INCIDENT_CONFIGS } from '@/lib/sre-utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { 
  Flame, 
  Zap, 
  Activity, 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function IncidentControlPanel() {
  const { 
    triggerIncident, 
    autoSreMode, 
    toggleAutoSre, 
    incidents, 
    performDeployment,
    scaleService,
    toilCount
  } = useSREStore();

  const activeCount = incidents.filter(i => i.status !== 'resolved').length;

  const handleTrigger = (type: IncidentType) => {
    const config = INCIDENT_CONFIGS[type];
    triggerIncident({
      type,
      description: config.description,
      severity: config.severity,
      service: config.service,
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Flame className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Chaos Training Lab</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Pick an incident type to see how the system reacts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 px-4 py-2 bg-zinc-100 dark:bg-zinc-800/30 rounded-full border border-zinc-200 dark:border-zinc-800 self-stretch md:self-auto">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                autoSreMode ? "bg-emerald-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600"
              )} />
              <Label htmlFor="auto-sre" className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Auto-SRE Mode</Label>
              <Switch 
                id="auto-sre" 
                checked={autoSreMode} 
                onCheckedChange={toggleAutoSre}
                className="scale-75"
              />
            </div>
            <div className="hidden sm:block w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
            <div className="hidden sm:flex items-center gap-2">
              <Activity className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
              <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Status: {activeCount > 0 ? 'Learning Active' : 'Waiting'}</span>
            </div>
          </div>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
            {(Object.keys(INCIDENT_CONFIGS) as IncidentType[]).map((type) => {
              const config = INCIDENT_CONFIGS[type];
              return (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTrigger(type)}
                      className="bg-zinc-50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/50 group h-20 flex flex-col items-center justify-center gap-1.5 transition-all relative overflow-hidden"
                    >
                      <Zap className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                      <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 text-center leading-tight px-2 uppercase tracking-tighter">
                        {type.replace(/_/g, ' ')}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 max-w-[200px] p-3 text-zinc-900 dark:text-zinc-100 shadow-xl">
                    <p className="text-[11px] leading-relaxed">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Beginner Concept:</span>
                      {config.beginnerDescription}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Change Management Training</h3>
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold h-12 flex flex-col items-center justify-center gap-0.5"
              onClick={() => performDeployment('normal')}
            >
              <span>Normal Deploy</span>
              <span className="text-[8px] font-normal opacity-70">30% Risk of Failure</span>
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 flex flex-col items-center justify-center gap-0.5 text-zinc-900 dark:text-zinc-100"
              onClick={() => performDeployment('canary')}
            >
              <span>Canary Deploy</span>
              <span className="text-[8px] font-normal opacity-70">Safe & Gradual</span>
            </Button>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-3 italic">
            "70% of outages are caused by changes." Try a Normal Deploy and see if it breaks the system!
          </p>
        </Card>

        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Capacity Planning & Toil</h3>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 text-zinc-900 dark:text-zinc-100"
              onClick={() => scaleService(1)}
            >
              Scale Up (+1 Pod)
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 text-zinc-900 dark:text-zinc-100"
              onClick={() => scaleService(-1)}
            >
              Scale Down (-1 Pod)
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500 dark:text-zinc-500">Toil Tracking:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-500">{toilCount} Manual Actions</span>
          </div>
          <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(toilCount % 10) * 10}%` }} />
          </div>
        </Card>
      </div>
    </div>
  );
}
