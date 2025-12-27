'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Zap, DollarSign, BarChart3, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function StrategyPanel() {
  const { 
    featureVelocity, 
    setFeatureVelocity, 
    totalCost, 
    infrastructureCost, 
    costPerIncident,
    incidents,
    errorBudget
  } = useSREStore();

  const activeIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const currentIncidentCost = (activeIncidents * costPerIncident);

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <Zap className="w-4 h-4 text-amber-500" />
          OPERATIONAL STRATEGY
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Velocity vs Reliability */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Feature Velocity</span>
              <Badge variant="outline" className={cn(
                "text-[9px] uppercase tracking-tighter",
                featureVelocity > 70 ? "text-amber-500 border-amber-500/20" : "text-emerald-500 border-emerald-500/20"
              )}>
                {featureVelocity > 70 ? 'Aggressive' : featureVelocity > 30 ? 'Balanced' : 'Conservative'}
              </Badge>
            </div>
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">{featureVelocity}%</span>
          </div>
          <Slider 
            value={[featureVelocity]} 
            onValueChange={(val) => setFeatureVelocity(val[0])}
            max={100} 
            step={1}
            className="py-4"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 text-[9px] text-zinc-500 dark:text-zinc-500">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Low risk, High stability
            </div>
            <div className="flex items-center gap-1 text-[9px] text-zinc-500 dark:text-zinc-500 justify-end">
              High risk, Fast shipping
              <TrendingUp className="w-3 h-3 text-amber-500" />
            </div>
          </div>
          {errorBudget < 20 && featureVelocity > 50 && (
            <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-rose-500 mt-0.5" />
              <p className="text-[9px] text-rose-500 leading-tight">
                <strong>Budget Warning:</strong> High velocity with low error budget is dangerous. Pause releases?
              </p>
            </div>
          )}
        </div>

        {/* Cost Awareness */}
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">FinOps Visibility</span>
            <Badge variant="outline" className="text-[9px] text-blue-500 border-blue-500/20 uppercase">Real-time Cost</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase">Cumulative Burn</p>
                <p className="text-xl font-black text-zinc-900 dark:text-zinc-100">${totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <DollarSign className="w-8 h-8 text-zinc-200 dark:text-zinc-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
                <p className="text-[8px] font-bold text-zinc-500 uppercase">Infrastructure/min</p>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">${(infrastructureCost * 60).toFixed(2)}</p>
              </div>
              <div className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
                <p className="text-[8px] font-bold text-zinc-500 uppercase">Incident Loss/hr</p>
                <p className="text-xs font-bold text-rose-500">${currentIncidentCost.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
