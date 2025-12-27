'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertCircle, Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function UserImpactPanel() {
  const { userSatisfaction, failedUserActions, loadDelay, metrics } = useSREStore();

  const getSatisfactionColor = (val: number) => {
    if (val > 90) return 'text-emerald-500';
    if (val > 70) return 'text-yellow-500';
    return 'text-rose-500';
  };

  return (
    <Card className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Users className="w-4 h-4 text-zinc-400" />
          USER EXPERIENCE IMPACT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Customer Satisfaction</span>
            <span className={cn("text-xl font-black tracking-tighter", getSatisfactionColor(userSatisfaction))}>
              {userSatisfaction.toFixed(1)}%
            </span>
          </div>
          <Progress value={userSatisfaction} className="h-1.5" />
          <p className="text-[10px] text-zinc-500 italic">
            {userSatisfaction > 90 ? "Users are happy and productive." : userSatisfaction > 70 ? "Users are noticing glitches." : "Critical frustration: Users are leaving!"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-3 h-3 text-rose-500" />
              <span className="text-[9px] font-bold text-zinc-500 uppercase">Failed Actions</span>
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{failedUserActions}</div>
            <div className="text-[8px] text-zinc-500">Total requests dropped</div>
          </div>

          <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-yellow-500" />
              <span className="text-[9px] font-bold text-zinc-500 uppercase">User Perceived Delay</span>
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{loadDelay.toFixed(0)}ms</div>
            <div className="text-[8px] text-zinc-500">Extra wait time per page</div>
          </div>
        </div>

        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase mb-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> SRE Insight: Business Value
          </h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            Every 100ms of latency can reduce conversion rates by 7%. Reliability is directly tied to revenue. 
            Currently, {metrics.errorRate > 0.5 ? 'high error rates' : 'system performance'} is impacting your bottom line.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
