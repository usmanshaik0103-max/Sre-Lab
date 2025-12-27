'use client';

import { useSREStore, Checkpoint } from '@/lib/sre-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  History, 
  PlayCircle,
  BrainCircuit,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Award,
  Users,
  Terminal,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYBOOKS = [
  {
    id: 'cpu-spike',
    title: 'High CPU Response',
    steps: [
      { text: 'Analyze system load', cmd: 'top' },
      { text: 'Check pod distribution', cmd: 'kubectl get pods' },
      { text: 'Scale up replicas', cmd: 'kubectl scale' },
      { text: 'Verify stability', cmd: 'curl' }
    ]
  },
  {
    id: 'memory-leak',
    title: 'Memory Leak Investigation',
    steps: [
      { text: 'Check memory usage', cmd: 'top' },
      { text: 'Identify leaking pods', cmd: 'kubectl get pods' },
      { text: 'Restart service', cmd: 'kubectl delete pod' },
      { text: 'Verify health', cmd: 'curl' }
    ]
  },
  {
    id: 'db-saturation',
    title: 'DB Connection Exhaustion',
    steps: [
      { text: 'Check DB connections', cmd: 'top' },
      { text: 'Identify app traffic', cmd: 'curl' },
      { text: 'Scale up workers', cmd: 'kubectl scale' },
      { text: 'Verify DB health', cmd: 'dig' }
    ]
  }
];

export function SRELearningHub() {
  const { 
    checkpoints, 
    completeCheckpoint, 
    decisionLog, 
    activePlaybook, 
    setActivePlaybook,
    playbookProgress,
    commandsExecuted,
    addLog,
    reliabilityScore,
    maturityLevel,
    experience
  } = useSREStore();

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInterview, setShowInterview] = useState(false);

  const INTERVIEW_QUESTIONS = [
    { q: "How do you define an SLA vs an SLO?", a: "An SLO is an internal target, while an SLA is a legal agreement with customers including consequences for missing targets." },
    { q: "What is Error Budget and how do you use it?", a: "It's the amount of unreliability allowed (1 - SLO). When exhausted, we prioritize stability over new features." },
    { q: "Explain 'Toil' in the context of SRE.", a: "Toil is manual, repetitive work that scales with the size of the system and lacks enduring value." },
  ];

  const MATURITY_STEPS = [
    { level: 0, title: 'Manual Ops', desc: 'Reacting to fires manually' },
    { level: 1, title: 'Apprentice', desc: 'Beginning to use monitoring' },
    { level: 2, title: 'Specialist', desc: 'Using Error Budgets effectively' },
    { level: 3, title: 'Automated', desc: 'Implementing self-healing systems' },
    { level: 4, title: 'Architect', desc: 'Designing for resilience first' },
  ];

  const handleCheckpointClick = (cp: Checkpoint) => {
    if (cp.completed) return;
    setSelectedCheckpoint(cp);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const submitAnswer = () => {
    if (selectedCheckpoint && selectedAnswer !== null) {
      setShowFeedback(true);
      if (selectedAnswer === selectedCheckpoint.correctAnswer) {
        completeCheckpoint(selectedCheckpoint.id);
        addLog(`CHECKPOINT: Passed "${selectedCheckpoint.title}" assessment.`, 'success');
      }
    }
  };

  const currentPlaybook = PLAYBOOKS.find(p => p.id === activePlaybook);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Knowledge Checkpoints */}
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Knowledge Checkpoints
            </h3>
            <Badge variant="outline" className="text-[10px] font-bold text-zinc-500 uppercase border-zinc-200 dark:border-zinc-800">
              {checkpoints.filter(c => c.completed).length}/{checkpoints.length} COMPLETED
            </Badge>
          </div>

          <div className="space-y-3">
            {checkpoints.map((cp) => (
              <button
                key={cp.id}
                onClick={() => handleCheckpointClick(cp)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all group",
                  cp.completed 
                    ? "bg-emerald-500/5 border-emerald-500/20 opacity-80" 
                    : "bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5"
                )}
              >
                <div className="flex items-center gap-3">
                  {cp.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500" />
                  )}
                  <div className="text-left">
                    <p className={cn("text-xs font-bold", cp.completed ? "text-emerald-600 dark:text-emerald-500" : "text-zinc-700 dark:text-zinc-300")}>{cp.title}</p>
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">{cp.concept}</p>
                  </div>
                </div>
                {!cp.completed && <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />}
              </button>
            ))}
          </div>

          {/* Modal for Checkpoint */}
          <AnimatePresence>
            {selectedCheckpoint && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              >
                <Card className="max-w-md w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">{selectedCheckpoint.title}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{selectedCheckpoint.question}</p>
                  
                  <div className="space-y-2 mb-8">
                    {selectedCheckpoint.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => !showFeedback && setSelectedAnswer(i)}
                        className={cn(
                          "w-full text-left p-4 rounded-xl border text-sm transition-all",
                          selectedAnswer === i 
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400" 
                            : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400",
                          showFeedback && i === selectedCheckpoint.correctAnswer && "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400",
                          showFeedback && selectedAnswer === i && i !== selectedCheckpoint.correctAnswer && "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {showFeedback && (
                    <div className={cn(
                      "p-4 rounded-xl mb-6 text-xs font-medium leading-relaxed",
                      selectedAnswer === selectedCheckpoint.correctAnswer ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    )}>
                      {selectedAnswer === selectedCheckpoint.correctAnswer ? 'Correct! ' : 'Incorrect. '}
                      {selectedCheckpoint.explanation}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showFeedback ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                          onClick={() => setSelectedCheckpoint(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                          disabled={selectedAnswer === null}
                          onClick={submitAnswer}
                        >
                          Submit Answer
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-none"
                        onClick={() => setSelectedCheckpoint(null)}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Interactive Playbooks */}
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-blue-500" />
              Interactive Playbooks
            </h3>
            {activePlaybook && (
              <Badge className="bg-blue-500 text-white border-none animate-pulse">
                {playbookProgress}% COMPLETE
              </Badge>
            )}
          </div>

          <div className="space-y-4 flex-1">
            {!activePlaybook ? (
              <div className="grid grid-cols-1 gap-2">
                {PLAYBOOKS.map((pb) => (
                  <button
                    key={pb.id}
                    onClick={() => setActivePlaybook(pb.id)}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/5 group transition-all"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{pb.title}</p>
                      <p className="text-[9px] text-zinc-500 uppercase font-bold mt-1">Manual Terminal Training</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-400 dark:text-zinc-700 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-blue-500/20 p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Active Training</p>
                    <Button variant="ghost" size="xs" onClick={() => setActivePlaybook(null)} className="h-5 text-[9px] text-zinc-500">Cancel</Button>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                    {currentPlaybook?.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {currentPlaybook?.steps.map((step, i) => {
                    const isCompleted = (i + 1) * 25 <= playbookProgress;
                    const isCurrent = (i * 25) < playbookProgress && (i + 1) * 25 > playbookProgress;
                    
                    return (
                      <div key={i} className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border transition-all",
                        isCompleted ? "bg-emerald-500/5 border-emerald-500/20 opacity-60" :
                        isCurrent ? "bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/20" :
                        "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-40"
                      )}>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                          isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "border-zinc-300 dark:border-zinc-700 text-zinc-500"
                        )}>
                          {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <p className={cn("text-xs font-bold", isCompleted ? "text-emerald-600 dark:text-emerald-500" : "text-zinc-700 dark:text-zinc-200")}>{step.text}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Terminal className="w-3 h-3 text-zinc-400" />
                            <code className="text-[9px] bg-black text-emerald-400 px-1.5 py-0.5 rounded border border-zinc-800">{step.cmd}</code>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-500 mb-4 text-center italic">Run the commands in the System Logs terminal to progress.</p>
                  <Button 
                    className={cn(
                      "w-full h-10 text-xs font-bold uppercase tracking-widest transition-all",
                      playbookProgress >= 100 
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border-none"
                    )}
                    disabled={playbookProgress < 100}
                    onClick={() => {
                      addLog(`PLAYBOOK: Mastered "${currentPlaybook?.title}" response.`, 'success');
                      setActivePlaybook(null);
                    }}
                  >
                    {playbookProgress >= 100 ? 'Claim 50 XP' : 'In Progress...'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* SRE Maturity & Reliability Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                SRE Maturity & Reliability Score
              </h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase font-bold">Career Progression Tracking</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4">
                <div>
                   <p className="text-[9px] font-bold text-zinc-500 uppercase">Experience</p>
                   <p className="text-xl font-bold tracking-tighter text-blue-500">{experience} XP</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase">System Score</p>
                  <p className="text-3xl font-bold tracking-tighter text-emerald-600 dark:text-emerald-500">{reliabilityScore.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-800" />
            <div className="space-y-6">
              {MATURITY_STEPS.map((step) => (
                <div key={step.level} className="relative pl-10">
                  <div className={cn(
                    "absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all",
                    maturityLevel >= step.level ? "bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                  )} />
                  <div>
                    <div className="flex items-center gap-3">
                      <p className={cn("text-xs font-bold uppercase tracking-wider", maturityLevel >= step.level ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600")}>
                        Level {step.level}: {step.title}
                      </p>
                      {maturityLevel === step.level && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20 text-[8px] h-4 px-1.5">CURRENT</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Interview Mode */}
        <Card className="lg:col-span-4 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Zap className="w-48 h-48 text-purple-500" />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              Interview Mode
            </h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2">
              <BrainCircuit className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Practice Interview</h4>
              <p className="text-[10px] text-zinc-500 mt-1">Simulate a post-mortem review or technical interview with an SRE lead.</p>
            </div>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-widest h-9"
              onClick={() => setShowInterview(true)}
            >
              Start Session
            </Button>
          </div>

          <AnimatePresence>
            {showInterview && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              >
                <Card className="max-w-2xl w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <MessageSquare className="w-64 h-64 text-purple-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Interview with SRE Lead</h4>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Post-Incident Review Simulation</p>
                      </div>
                    </div>

                    <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                      {INTERVIEW_QUESTIONS.map((item, i) => (
                        <div key={i} className="space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Question {i + 1}</p>
                          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.q}</p>
                          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 mt-3">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Model SRE Answer</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">"{item.a}"</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <Button 
                        className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-black font-bold h-10 border-none"
                        onClick={() => setShowInterview(false)}
                      >
                        Finish Prep Session
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Decision Log & Outcome Tracking */}
      <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <History className="w-4 h-4 text-amber-500" />
            Decision Log
          </h3>
          <Badge variant="outline" className="text-[10px] font-bold text-zinc-500 uppercase border-zinc-200 dark:border-zinc-800">
            No-Blame Culture
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Timestamp</th>
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Action Taken</th>
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Justification</th>
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Impact</th>
              </tr>
            </thead>
            <tbody>
              {decisionLog.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-xs text-zinc-400 italic">No decisions recorded yet. Start operating the system!</td>
                </tr>
              ) : (
                decisionLog.map((log) => (
                  <tr key={log.id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-4 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{log.decision}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 max-w-xs">{log.reason}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          log.impact === 'positive' ? "bg-emerald-500" : 
                          log.impact === 'negative' ? "bg-rose-500" : "bg-amber-500"
                        )} />
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-widest",
                          log.impact === 'positive' ? "text-emerald-600 dark:text-emerald-500" : 
                          log.impact === 'negative' ? "text-rose-600 dark:text-rose-500" : "text-amber-600 dark:text-amber-500"
                        )}>
                          {log.impact}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
