'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Clock, Search, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export function AlertList({ onSelect }: { onSelect: (id: string) => void }) {
  const { incidents } = useSREStore();
  const activeIncidents = incidents.filter(i => i.status !== 'resolved');

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-4 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          Active Incidents ({activeIncidents.length})
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {activeIncidents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 space-y-2 py-10">
            <CheckCircle2 className="w-8 h-8 opacity-20" />
            <p className="text-[10px] uppercase font-bold tracking-tighter">System Nominal</p>
          </div>
        ) : (
          activeIncidents.map((inc) => (
            <div 
              key={inc.id}
              className={cn(
                "p-3 rounded-lg border transition-all cursor-pointer group",
                inc.severity === 'critical' ? "border-rose-500/30 bg-rose-500/5" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
              )}
              onClick={() => onSelect(inc.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={cn(
                  "text-[9px] uppercase font-bold px-1.5 py-0",
                  inc.severity === 'critical' && "bg-rose-500 text-white",
                  inc.severity === 'high' && "bg-amber-500 text-black",
                  inc.severity === 'medium' && "bg-blue-500 text-white",
                  inc.severity === 'low' && "bg-zinc-500 text-white"
                )}>
                  {inc.severity}
                </Badge>
                <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px]">{formatDistanceToNow(inc.startTime)} ago</span>
                </div>
              </div>
              
              <h4 className="text-[11px] font-bold text-zinc-900 dark:text-zinc-200 leading-tight mb-1 group-hover:text-rose-500 transition-colors">
                {inc.description}
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono mb-3">Service: {inc.service}</p>
              
              <Button variant="secondary" size="sm" className="w-full h-7 text-[10px] uppercase font-bold gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-none">
                <Search className="w-3 h-3" />
                Root Cause Analysis
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
