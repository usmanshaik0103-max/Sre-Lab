'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Server, Database, Shield, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const SERVICES = [
  { id: 'frontend', name: 'Frontend App', icon: Globe, x: 50, y: 50, deps: ['api-gateway'] },
  { id: 'api-gateway', name: 'API Gateway', icon: Shield, x: 200, y: 50, deps: ['auth-service', 'inventory-api'] },
  { id: 'auth-service', name: 'Auth Service', icon: Server, x: 350, y: 20, deps: ['users-db'] },
  { id: 'inventory-api', name: 'Inventory API', icon: Server, x: 350, y: 80, deps: ['inventory-db'] },
  { id: 'users-db', name: 'Users DB', icon: Database, x: 500, y: 20, deps: [] },
  { id: 'inventory-db', name: 'Inventory DB', icon: Database, x: 500, y: 80, deps: [] },
];

export function ServiceDependencyMap() {
  const { incidents } = useSREStore();
  
  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  
  const getServiceStatus = (serviceId: string) => {
    const serviceIncidents = activeIncidents.filter(i => 
      i.service.toLowerCase().includes(serviceId.toLowerCase()) ||
      (serviceId === 'api-gateway' && i.service === 'API-Gateway')
    );
    if (serviceIncidents.some(i => i.severity === 'critical' || i.severity === 'high')) return 'error';
    if (serviceIncidents.length > 0) return 'warning';
    return 'healthy';
  };

  return (
    <Card className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Network className="w-4 h-4 text-emerald-500" />
          SERVICE DEPENDENCY GRAPH
        </CardTitle>
      </CardHeader>
      <CardContent className="relative h-[300px] mt-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-zinc-300 dark:text-zinc-800" />
            </marker>
          </defs>
          {SERVICES.map(service => 
            service.deps.map(depId => {
              const dep = SERVICES.find(s => s.id === depId);
              if (!dep) return null;
              
              const isAffected = getServiceStatus(service.id) !== 'healthy' || getServiceStatus(dep.id) !== 'healthy';
              
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
                    opacity: 1,
                    stroke: isAffected ? '#f43f5e' : '#27272a',
                    strokeDasharray: isAffected ? '4 2' : 'none'
                  }}
                  className={cn(
                    "transition-colors duration-500",
                    isAffected ? "text-rose-500" : "text-zinc-200 dark:text-zinc-800"
                  )}
                />
              );
            })
          )}
        </svg>

        <div className="absolute inset-0">
          {SERVICES.map(service => {
            const status = getServiceStatus(service.id);
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                style={{ left: `${service.x}%`, top: `${service.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                whileHover={{ scale: 1.1 }}
              >
                <div className={cn(
                  "p-3 rounded-xl border-2 transition-all duration-500 flex flex-col items-center gap-1 bg-white dark:bg-zinc-950 shadow-sm",
                  status === 'error' ? "border-rose-500 shadow-rose-500/20 bg-rose-500/5" :
                  status === 'warning' ? "border-amber-500 shadow-amber-500/20 bg-amber-500/5" :
                  "border-zinc-200 dark:border-zinc-800 group-hover:border-emerald-500/50"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    status === 'error' ? "text-rose-500 animate-pulse" :
                    status === 'warning' ? "text-amber-500" :
                    "text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500"
                  )} />
                  <span className="text-[8px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter whitespace-nowrap">
                    {service.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-0 right-0 p-2 bg-white/80 dark:bg-black/80 backdrop-blur rounded-tl-lg border-t border-l border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Healthy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Affected</span>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-[10px] text-zinc-500 leading-tight">
          <strong>Blast Radius:</strong> Failures in downstream services (like Databases) propagate upwards. 
          The API Gateway is currently {getServiceStatus('api-gateway') === 'healthy' ? 'isolating' : 'transmitting'} faults.
        </p>
      </div>
    </Card>
  );
}
