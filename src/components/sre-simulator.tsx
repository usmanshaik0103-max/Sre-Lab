'use client';

import { useEffect, useRef } from 'react';
import { useSREStore, Metrics, IncidentType } from '@/lib/sre-store';
import { INCIDENT_CONFIGS } from '@/lib/sre-utils';

const BASE_METRICS: Metrics = {
  cpu: 15,
  memory: 42,
  disk: 28,
  latency: 120,
  errorRate: 0.02,
  network: 450,
  dbConnections: 12,
  podCount: 5,
  traffic: 1000,
};

export function SRESimulator() {
  const { metrics, incidents, autoSreMode, updateMetrics, triggerIncident, addLog, deployments } = useSREStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const activeIncidents = incidents.filter(inc => inc.status !== 'resolved');
      
      // Check for bad deployments and trigger incidents
      const latestDeployment = deployments[0];
      if (latestDeployment && 
          latestDeployment.status === 'failure' && 
          Date.now() - latestDeployment.timestamp < 5000 &&
          !activeIncidents.some(i => i.type === 'bad_deployment')) {
        
        triggerIncident({
          type: 'bad_deployment',
          description: `Critical: Deployment ${latestDeployment.version} failed validation and is causing high error rates.`,
          severity: 'critical',
          service: 'API-Gateway',
        });
      }

      // Calculate current targets based on incidents
      const targets = { ...BASE_METRICS };
      
      // Update traffic target based on ddos or organic growth
      if (activeIncidents.some(i => i.type === 'ddos_attack')) {
        targets.traffic = 50000 + Math.random() * 10000;
      } else if (activeIncidents.some(i => i.type === 'capacity_exhausted')) {
        targets.traffic = 5000 + Math.random() * 1000;
      }
      
      // Influence targets based on active incidents
      activeIncidents.forEach(inc => {
        switch (inc.type) {
          case 'cpu_spike':
            targets.cpu += 60 + Math.random() * 20;
            targets.latency += 200;
            break;
          case 'memory_leak':
            targets.memory += 40 + Math.random() * 10;
            break;
          case 'disk_saturation':
            targets.disk += 50 + Math.random() * 20;
            targets.latency += 100;
            break;
          case 'network_loss':
            targets.network -= 300;
            targets.latency += 500;
            targets.errorRate += 5;
            break;
          case 'high_latency':
            targets.latency += 800 + Math.random() * 400;
            break;
          case 'error_rate_surge':
            targets.errorRate += 15 + Math.random() * 10;
            break;
          case 'pod_crash':
            targets.podCount = Math.max(1, targets.podCount - 3);
            targets.cpu += 30;
            targets.errorRate += 2;
            break;
          case 'service_down':
            targets.errorRate += 100;
            targets.latency = 0;
            break;
          case 'db_exhaustion':
            targets.dbConnections += 80;
            targets.errorRate += 10;
            targets.latency += 300;
            break;
          case 'cache_storm':
            targets.latency += 150;
            targets.cpu += 20;
            break;
          case 'ddos_attack':
            targets.cpu += 70;
            targets.errorRate += 40;
            targets.latency += 1200;
            break;
          case 'bad_deployment':
            targets.errorRate += 80;
            targets.latency += 500;
            break;
          case 'capacity_exhausted':
            targets.cpu += 40;
            targets.latency += 600;
            targets.errorRate += 5;
            break;
          case 'dns_outage':
            targets.errorRate = 100;
            targets.network = 0;
            targets.latency = 0;
            break;
        }
      });

      // Gradually move current metrics towards targets with noise
      const nextMetrics: Metrics = {
        cpu: lerp(metrics.cpu, targets.cpu, 0.1) + (Math.random() - 0.5) * 2,
        memory: lerp(metrics.memory, targets.memory, 0.05) + (Math.random() - 0.5) * 1,
        disk: lerp(metrics.disk, targets.disk, 0.02) + (Math.random() - 0.5) * 0.5,
        latency: lerp(metrics.latency, targets.latency, 0.15) + (Math.random() - 0.5) * 10,
        errorRate: lerp(metrics.errorRate, targets.errorRate, 0.2) + (Math.random() - 0.5) * 0.1,
        network: lerp(metrics.network, targets.network, 0.1) + (Math.random() - 0.5) * 20,
        dbConnections: Math.round(lerp(metrics.dbConnections, targets.dbConnections, 0.1)),
        podCount: Math.round(lerp(metrics.podCount, targets.podCount, 0.05)),
        traffic: lerp(metrics.traffic, targets.traffic, 0.1) + (Math.random() - 0.5) * 100,
      };

      // Clamp values
      nextMetrics.cpu = Math.max(0, Math.min(100, nextMetrics.cpu));
      nextMetrics.memory = Math.max(0, Math.min(100, nextMetrics.memory));
      nextMetrics.disk = Math.max(0, Math.min(100, nextMetrics.disk));
      nextMetrics.errorRate = Math.max(0, Math.min(100, nextMetrics.errorRate));
      nextMetrics.latency = Math.max(0, nextMetrics.latency);

      updateMetrics(nextMetrics);

        // Auto-SRE logic / Random Incident Generator
        const { maturityLevel, missedCriticalAlerts } = useSREStore.getState();
        
        if (activeIncidents.length < 3 && Math.random() < (autoSreMode ? 0.08 : 0.04)) {
          const types: IncidentType[] = [
            'cpu_spike', 'memory_leak', 'disk_saturation', 'network_loss', 
            'high_latency', 'error_rate_surge', 'pod_crash', 'db_exhaustion',
            'ddos_attack', 'dns_outage'
          ];
          
          // Add noisy alerts for low maturity levels (Alert Fatigue training)
          if (maturityLevel < 2 && Math.random() < 0.6) {
            addLog(`NOISE [P3]: Potential jitter in node-${Math.floor(Math.random() * 10)}. No impact detected.`, "warn");
          }

          const randomType = types[Math.floor(Math.random() * types.length)];
          const config = INCIDENT_CONFIGS[randomType];
          
          triggerIncident({
            type: randomType,
            description: config.description,
            severity: config.severity,
            service: config.service,
          });

          // If many missed alerts, update learning topic to on-call
          if (missedCriticalAlerts > 2) {
            useSREStore.getState().setLearningTopic('on_call');
          }
        }

    }, 1000);


    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [metrics, incidents, autoSreMode, updateMetrics, triggerIncident, addLog]);

  return null;
}

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}
