'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamic imports for recharts to avoid SSR/Chunking issues
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  history: any[];
  dataKey: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'normal' | 'warning' | 'critical';
}

export function MetricCard({ 
  title, 
  value, 
  unit = '', 
  history, 
  dataKey, 
  color = '#3b82f6',
  status = 'normal' 
}: MetricCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2 overflow-hidden relative min-h-[140px]">
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</span>
        <div className={cn(
          "h-2 w-2 rounded-full",
          status === 'normal' && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
          status === 'warning' && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
          status === 'critical' && "bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]"
        )} />
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">{value}</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{unit}</span>
      </div>

      <div className="h-12 w-full mt-2 -mx-4 flex-1">
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <YAxis hide domain={['auto', 'auto']} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
