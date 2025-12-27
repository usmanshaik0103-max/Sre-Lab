'use client';

import { useSREStore } from '@/lib/sre-store';
import { getRCA, getRemediation } from '@/lib/sre-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Cpu, Wrench, CheckCircle2, Info, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

export function RCAPanel({ incidentId, onClose }: { incidentId: string | null, onClose: () => void }) {
  const { incidents, resolveIncident, setIncidentStatus, addLog, teachingMode, setLearningTopic } = useSREStore();
  const [analyzing, setAnalyzing] = useState(false);
  
  const incident = incidents.find(i => i.id === incidentId);

  useEffect(() => {
    if (incident && !incident.rca && incident.status !== 'resolved') {
      setAnalyzing(true);
      const timer = setTimeout(() => {
        setAnalyzing(false);
        if (teachingMode) setLearningTopic('rca');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [incidentId, incident?.id, teachingMode, setLearningTopic]);

  if (!incident) {
    return (
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center text-center space-y-4 h-full shadow-sm">
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-full">
          <BrainCircuit className="w-12 h-12 text-zinc-400 dark:text-zinc-600" />
        </div>
        <div>
          <h3 className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-xs">AI Analysis Engine</h3>
          <p className="text-zinc-400 dark:text-zinc-600 text-[10px] max-w-[200px] mt-2 italic">Select an active incident from the list to begin deep metric correlation and root cause discovery.</p>
        </div>
      </Card>
    );
  }

  const rca = getRCA(incident.type);
  const remediation = getRemediation(incident.type);

  const handleResolve = () => {
    setIncidentStatus(incident.id, 'remediating');
    addLog(`System performing auto-remediation: ${remediation.action}`, 'info');
    if (teachingMode) setLearningTopic('remediation');
    
    setTimeout(() => {
      resolveIncident(incident.id);
    }, 3000);
  };

  if (incident.status === 'resolved') {
    return (
      <Card className="bg-white dark:bg-zinc-900/50 border-emerald-500/20 p-8 flex flex-col h-full overflow-y-auto custom-scrollbar shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Blameless Postmortem</h3>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-mono">Status: RESOLVED & ARCHIVED</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">×</Button>
        </div>

        <div className="space-y-8">
          <section>
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-3 h-3" /> Summary of Events
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                The system experienced a <span className="text-emerald-600 dark:text-emerald-400 font-bold">{incident.type.replace(/_/g, ' ')}</span> event in the <span className="text-zinc-900 dark:text-zinc-100">{incident.service}</span> component. 
                Detection was triggered by automated SLI monitoring when thresholds were breached.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Root Cause (Systemic)</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-l-2 border-emerald-500/50 pl-4 italic">
                "{rca?.explanation}"
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Action Items (Preventative)</h4>
              <ul className="space-y-2">
                <li className="text-[11px] text-zinc-500 dark:text-zinc-400 flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                  Automate threshold alerts for {incident.type}
                </li>
                <li className="text-[11px] text-zinc-500 dark:text-zinc-400 flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                  Review capacity limits for {incident.service}
                </li>
              </ul>
            </div>
          </section>

          <section className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <BookOpen className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SRE Learning: Blamelessness</span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
              This postmortem focused on <span className="text-emerald-600 dark:text-emerald-500 font-bold">systemic failure</span> rather than human error. In a blameless culture, 
              we assume engineers act in good faith and that failures are the result of poor tooling or brittle processes.
            </p>
          </section>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline" className="text-[10px] font-bold uppercase h-8 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              Acknowledge & Close
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full relative overflow-y-auto custom-scrollbar shadow-sm">
      {analyzing ? (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-zinc-100 dark:border-zinc-800 rounded-full" />
            <div className="w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0" />
            <BrainCircuit className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest animate-pulse">Correlating Metrics...</h3>
            <p className="text-[10px] text-zinc-500 mt-2 font-mono">Analyzing {incident.service} logs & throughput</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Root Cause Analysis</h3>
                <p className="text-[10px] text-zinc-500">Incident ID: {incident.id}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">×</Button>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter flex items-center gap-2">
                <Cpu className="w-3 h-3" /> Probable Cause
              </span>
              <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                {Math.round((rca?.confidence || 0) * 100)}% Confidence
              </Badge>
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">{rca?.cause}</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-700 pl-3 mb-4">
              "{rca?.explanation}"
            </p>
            
            {teachingMode && rca?.learningSteps && (
              <div className="bg-blue-500/5 border border-blue-500/10 rounded p-3 mt-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Learning Guide</span>
                </div>
                <div className="space-y-3">
                  {rca.learningSteps.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <span className="text-[10px] font-bold text-blue-500/50 mt-0.5">0{step.step}</span>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-200">{step.title}</p>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 leading-tight">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">Remediation Steps</h4>
            </div>
            <div className="space-y-2">
              {remediation?.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <div className="h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[9px] font-bold shrink-0">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            {teachingMode && (
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded p-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                  <Info className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Why this fix?</span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  {remediation?.learningExplanation}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-3">
            <Button 
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[10px] gap-2 h-10"
              onClick={handleResolve}
              disabled={incident.status === 'remediating'}
            >
              {incident.status === 'remediating' ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Applying {remediation?.action}...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Execute: {remediation?.action}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
