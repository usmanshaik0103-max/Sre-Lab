'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertCircle, 
  ShieldCheck,
  ArrowRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

export function BusinessImpactPanel() {
  const { 
    featureVelocity, 
    setFeatureVelocity, 
    userSatisfaction, 
    failedUserActions, 
    loadDelay,
    infrastructureCost,
    totalCost,
    errorBudget,
    addDecision
  } = useSREStore();

  const handleVelocityChange = (val: number[]) => {
    const newVelocity = val[0];
    setFeatureVelocity(newVelocity);
    
    if (newVelocity > 80) {
      addDecision({
        decision: 'Maximize Feature Velocity',
        reason: 'Business demands rapid delivery of new capabilities',
        outcome: 'Increased market competitiveness but higher risk to reliability',
        impact: 'neutral'
      });
    } else if (newVelocity < 20) {
      addDecision({
        decision: 'Prioritize Reliability',
        reason: 'Stabilizing system after budget depletion',
        outcome: 'Reduced incident rate but slower feature delivery',
        impact: 'positive'
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1) Reliability vs Feature Velocity */}
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-amber-500" />
            Reliability vs Velocity
          </h3>
          <Badge className={cn(
            "text-[10px] font-bold border-none",
            featureVelocity > 70 ? "bg-rose-500 text-white" : 
            featureVelocity < 30 ? "bg-emerald-500 text-black" : "bg-amber-500 text-black"
          )}>
            {featureVelocity > 70 ? 'Aggressive' : featureVelocity < 30 ? 'Conservative' : 'Balanced'}
          </Badge>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-zinc-400 dark:text-zinc-500">Feature Velocity</span>
              <span className="text-zinc-900 dark:text-zinc-300">{featureVelocity}%</span>
            </div>
            <Slider 
              value={[featureVelocity]} 
              onValueChange={handleVelocityChange}
              max={100} 
              step={5}
              className="py-4"
            />
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/50 space-y-2">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
              "Moving faster increases the risk of bad deployments and consumes the error budget faster. Pausing releases protects reliability but slows business growth."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50">
              <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1">Risk Level</p>
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", featureVelocity > 60 ? "bg-rose-500" : "bg-emerald-500")} />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{featureVelocity > 60 ? 'High' : 'Low'}</span>
              </div>
            </div>
            <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50">
              <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1">Growth Impact</p>
              <div className="flex items-center gap-1.5">
                <TrendingUp className={cn("w-3 h-3", featureVelocity > 40 ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-500")} />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{featureVelocity > 40 ? 'Positive' : 'Slow'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2) User Experience Impact View */}
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Users className="w-3 h-3 text-blue-500" />
            User Experience Impact
          </h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1 h-3 rounded-full",
                  i < Math.floor(userSatisfaction / 20) ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                )} 
              />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Satisfaction</p>
              <p className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">{userSatisfaction.toFixed(1)}%</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Sentiment</p>
              <Badge variant="outline" className={cn(
                "text-[9px] font-bold border-none px-2",
                userSatisfaction > 90 ? "bg-emerald-500/10 text-emerald-500" : 
                userSatisfaction > 70 ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {userSatisfaction > 90 ? 'DELIGHTED' : userSatisfaction > 70 ? 'SATISFIED' : 'FRUSTRATED'}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <AlertCircle className={cn("w-3 h-3", failedUserActions > 0 ? "text-rose-500" : "text-zinc-400 dark:text-zinc-500")} />
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Failed Actions</span>
              </div>
              <span className={cn("text-xs font-bold", failedUserActions > 0 ? "text-rose-500" : "text-zinc-900 dark:text-zinc-200")}>
                {failedUserActions}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <Activity className={cn("w-3 h-3", loadDelay > 200 ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500")} />
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Perceived Latency</span>
              </div>
              <span className={cn("text-xs font-bold", loadDelay > 200 ? "text-amber-500" : "text-zinc-900 dark:text-zinc-200")}>
                +{loadDelay.toFixed(0)}ms
              </span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] text-zinc-500 font-medium">
              Users care about results, not metrics. 1% error rate means 1 out of 100 users just failed their checkout.
            </p>
          </div>
        </div>
      </Card>

      {/* 3) Cost Awareness & FinOps */}
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <DollarSign className="w-3 h-3 text-emerald-500" />
            FinOps & Cloud Cost
          </h3>
          <Badge variant="secondary" className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-none">
            MONTH-TO-DATE
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Burn</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tighter text-emerald-600 dark:text-emerald-500">${totalCost.toFixed(2)}</p>
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600">USD</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-zinc-500">Infrastructure</span>
                <span className="text-zinc-900 dark:text-zinc-300">${infrastructureCost.toFixed(3)}/s</span>
              </div>
              <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${Math.min(100, (infrastructureCost / 0.5) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">Cost Efficiency</span>
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Reliability isn't free. Scaling to 99.99% costs 10x more than 99.9%. Are you over-provisioning?
              </p>
            </div>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 cursor-help hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                  <ArrowRight className="w-3 h-3" />
                  View Cost vs SLA Breakdown
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-[10px] p-2 max-w-[200px] text-zinc-900 dark:text-zinc-100">
                Higher reliability requirements demand redundant systems and multi-region failover, which exponentially increase infrastructure costs.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  );
}
