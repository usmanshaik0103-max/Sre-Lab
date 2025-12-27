'use client';

import { useSREStore, Metrics } from '@/lib/sre-store';
import { MetricCard } from './metric-card';
import { Card } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { 
  Tooltip as UITooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info } from 'lucide-react';
import { BusinessImpactPanel } from './business-impact-panel';
import { SystemTopology } from './system-topology';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Dynamic imports for recharts to avoid SSR/Chunking issues
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });

export function RealTimeDashboard() {
  const { metrics, history, teachingMode, errorBudget, toilTime, totalCost, automationSavings } = useSREStore();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatus = (val: number, warn: number, crit: number) => {
    if (val >= crit) return 'critical';
    if (val >= warn) return 'warning';
    return 'normal';
  };

  const METRIC_INFO = {
    cpu: 'CPU is the "Brain" of the server. High CPU means the server is very busy calculating or processing data.',
    memory: 'Memory (RAM) is the "Work Space". If it hits 100%, the server will crash because it has no room to think.',
    latency: 'Latency is "Wait Time". High latency means users are waiting a long time for the page to load.',
    errorRate: 'Error Rate is "Failure Percentage". Anything above 1% means users are seeing "Something went wrong" messages.',
    traffic: 'Traffic is the number of "People" (Requests) visiting your site right now.',
    budget: 'Error Budget is how many "Mistakes" you are allowed to make before breaking your promise to customers.',
    toil: 'Toil is "Manual Grunt Work" that is repetitive and adds no long-term value. SREs try to eliminate this with automation.',
    cost: 'Infrastructure Cost is how much money the system is burning right now. Incidents and Scaling increase this.',
    fatigue: 'Alert Fatigue occurs when there are too many noisy alerts. You have missed some critical alerts due to high noise!'
  };

  const { missedCriticalAlerts, alertNoiseLevel, onCallShiftActive } = useSREStore();

  if (!mounted) return <div className="h-96 w-full bg-zinc-100 dark:bg-zinc-900/20 animate-pulse rounded-lg" />;

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#27272a' : '#e4e4e7';
  const axisColor = isDark ? '#52525b' : '#a1a1aa';
  const tooltipBg = isDark ? '#18181b' : '#ffffff';
  const tooltipBorder = isDark ? '#27272a' : '#e4e4e7';

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
          onCallShiftActive ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full", onCallShiftActive ? "bg-amber-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600")} />
          On-Call Shift: {onCallShiftActive ? 'Active' : 'Standby'}
        </div>
        {missedCriticalAlerts > 0 && (
          <div className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-bounce">
            <AlertTriangle className="w-3 h-3" />
            Alert Fatigue: {missedCriticalAlerts} Critical Missed
          </div>
        )}
      </div>

      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          {[
            { key: 'cpu' as const, title: 'CPU Usage', unit: '%', color: '#10b981', warn: 70, crit: 90 },
            { key: 'memory' as const, title: 'Memory', unit: '%', color: '#3b82f6', warn: 75, crit: 90 },
            { key: 'latency' as const, title: 'Latency', unit: 'ms', color: '#f59e0b', warn: 500, crit: 1000 },
            { key: 'errorRate' as const, title: 'Error Rate', unit: '%', color: '#ef4444', warn: 1, crit: 5 },
            { key: 'traffic' as const, title: 'Traffic', unit: 'rps', color: '#8b5cf6', warn: 5000, crit: 10000 },
            { key: 'budget' as const, title: 'Error Budget', unit: '%', color: '#ec4899', warn: 20, crit: 5 },
            { key: 'toil' as const, title: 'Toil Time', unit: 's', color: '#71717a', warn: 300, crit: 600 },
            { key: 'cost' as const, title: 'Total Cost', unit: '$', color: '#facc15', warn: 1000, crit: 5000 },
          ].map((m) => (
            <div key={m.key} className="relative group">
              <MetricCard 
                title={m.title} 
                value={
                  m.key === 'budget' ? errorBudget.toFixed(2) :
                  m.key === 'toil' ? toilTime.toString() :
                  m.key === 'cost' ? totalCost.toFixed(0) :
                  m.key === 'latency' || m.key === 'traffic' ? Math.round(metrics[m.key as keyof Metrics] as number) : 
                  (metrics[m.key as keyof Metrics] as number).toFixed(m.key === 'errorRate' ? 2 : 1)
                } 
                unit={m.unit} 
                history={history} 
                dataKey={m.key === 'budget' ? 'errorBudget' : m.key}
                color={m.color}
                status={
                  m.key === 'budget' ? getStatus(100 - errorBudget, 80, 95) : 
                  m.key === 'cost' ? getStatus(totalCost, 5000, 10000) :
                  m.key === 'toil' ? getStatus(toilTime, 300, 600) :
                  getStatus(metrics[m.key as keyof Metrics] as number, m.warn, m.crit)
                }
              />
              {teachingMode && (
                <UITooltip>
                  <TooltipTrigger asChild>
                    <button className="absolute top-3 right-3 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Info className="w-3 h-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 max-w-[180px] text-[10px] leading-tight p-2 text-zinc-900 dark:text-zinc-100">
                    {METRIC_INFO[m.key]}
                  </TooltipContent>
                </UITooltip>
              )}
            </div>
          ))}
        </div>
        </TooltipProvider>

        <BusinessImpactPanel />

        <SystemTopology />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 lg:col-span-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Reliability & Budget Consumption
            </h3>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Automation Savings</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-500">+{automationSavings.toFixed(1)}h</p>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis hide />
                <YAxis domain={[0, 100]} stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', color: isDark ? '#f4f4f5' : '#18181b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="errorBudget" 
                  stroke="#ec4899" 
                  fillOpacity={1} 
                  fill="url(#colorBudget)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 lg:col-span-4 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Error Rate (SLI)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorErr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis hide />
                <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', color: isDark ? '#f4f4f5' : '#18181b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="errorRate" 
                  stroke="#ef4444" 
                  fillOpacity={1} 
                  fill="url(#colorErr)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
