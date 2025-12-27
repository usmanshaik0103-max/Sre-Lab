'use client';

import { useSREStore } from '@/lib/sre-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, HelpCircle, Shield, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOPICS: Record<string, { title: string; icon: any; content: string[]; quiz?: { q: string; a: string } }> = {
  monitoring: {
    title: 'Observability & Monitoring',
    icon: BookOpen,
    content: [
      'Monitoring tells you when something is broken.',
      'Observability helps you understand WHY it is broken.',
      'SREs use "The Four Golden Signals": Latency, Traffic, Errors, and Saturation.',
      'Saturation measures how close to "Full" your resources are.',
      'Observability relies on Logs, Metrics, and Distributed Tracing.'
    ],
    quiz: {
      q: 'What is the signal that measures how "full" your service is?',
      a: 'Saturation'
    }
  },
  incidents: {
    title: 'Incident Response (SEV)',
    icon: AlertTriangle,
    content: [
      'Severity Levels: P0 (Global Outage) to P3 (Minor Glitch).',
      'P0/P1 require immediate action; P3 can often wait.',
      'The goal is MTTR: Mean Time To Resolution (fix it fast!).',
      'During an incident, SREs act as "Firefighters" using runbooks.',
      'Prioritization depends on Customer Impact vs System Criticality.'
    ]
  },
  rca: {
    title: 'Root Cause Analysis',
    icon: Shield,
    content: [
      'Root Cause Analysis is about finding the deep architectural flaw.',
      'SREs use the "5 Whys" technique: Ask "Why" until the true cause is found.',
      'Detection -> Correlation -> Root Cause: The standard investigation flow.',
      'Goal: To ensure the same class of failure never happens again.',
      'Explain failures in plain English so stakeholders understand the fix.'
    ]
  },
  postmortem: {
    title: 'Blameless Postmortems',
    icon: BookOpen,
    content: [
      'A Postmortem is a written record focused on system failures.',
      'It focuses on PROCESS, not PEOPLE. No finger-pointing.',
      'It includes: What happened, Root Cause, and Action Items.',
      'A blameless culture encourages engineers to speak up about mistakes.',
      'Success is measured by the lack of repeat incidents.'
    ]
  },
  reliability: {
    title: 'SLA, SLO, and SLI',
    icon: TrendingUp,
    content: [
      'SLI: Service Level Indicator (What you measure, like Latency).',
      'SLO: Service Level Objective (Your target, like 99.9% uptime).',
      'SLA: Service Level Agreement (The legal contract with users).',
      'Error Budget: The allowed downtime (100% - SLO) per month.',
      'If budget is gone, stop new features and focus ONLY on stability.'
    ]
  },
  toil: {
    title: 'Toil & Automation',
    icon: Zap,
    content: [
      'Toil is manual, repetitive, tactical work that scales with users.',
      'Manual restarts and scaling are common examples of Toil.',
      'SREs aim to spend <50% of their time on toil.',
      'Automation turns "Runbooks" into "Code" to save time and reduce errors.',
      'Automation Savings are calculated as hours of human work prevented.'
    ]
  },
  change_management: {
    title: 'Change & Deployments',
    icon: Zap,
    content: [
      '70% of production outages are caused by changes (code/config).',
      'Canary Deployments roll out changes to a small % of users first.',
      'Rollbacks are the first line of defense: Undo the change immediately!',
      'Blue/Green Deployments switch traffic between two identical environments.',
      'Testing in Production is safer with high observability and feature flags.'
    ]
  },
  capacity: {
    title: 'Capacity & Scaling',
    icon: TrendingUp,
    content: [
      'Capacity Planning ensures systems handle growth and traffic spikes.',
      'Horizontal Scaling: Adding more "Pods" or servers.',
      'Vertical Scaling: Adding more CPU/RAM to existing servers.',
      'Under-provisioning causes outages; Over-provisioning wastes money.',
      'SREs balance Reliability vs Cost every day.'
    ]
  },
    security_reliability: {
      title: 'Security Reliability',
      icon: Shield,
      content: [
        'Security incidents often manifest as reliability failures.',
        'Rate Limiting prevents a single user from crashing the system.',
        'DDoS attacks simulate high traffic to exhaust system capacity.',
        'Defensive coding and quotas are SRE tools for security.',
        'Reliability isn\'t possible if the system is insecure.'
      ]
    },
    on_call: {
      title: 'On-Call & Alert Fatigue',
      icon: AlertTriangle,
      content: [
        'On-call means being ready to fix production at any time.',
        'Alert Fatigue happens when there are too many "Noisy" or "Fake" alerts.',
        'SREs tune alerts to ensure they are Actionable and Meaningful.',
        'A good alert should represent a real symptom, not just a cause.',
        'Missed alerts lead to SLA breaches and unhappy customers.'
      ]
    },
    tradeoffs: {
      title: 'The SRE Trade-offs',
      icon: TrendingUp,
      content: [
        '100% Reliability is the wrong target (it costs too much).',
        'Trade-off: Fast Features vs System Stability.',
        'Trade-off: High Performance vs Infrastructure Cost.',
        'Trade-off: Developer Velocity vs SRE Toil.',
        'SREs use Error Budgets to balance these competing priorities.'
      ]
    }
  };


export function LearningPanel() {
  const { learningTopic, teachingMode } = useSREStore();
  
  if (!teachingMode) return null;

  const topic = TOPICS[learningTopic || 'monitoring'] || TOPICS.monitoring;
  const Icon = topic.icon;

  return (
    <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-emerald-500/20 shadow-lg shadow-emerald-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">SRE Learning Lab</span>
        </div>
        <CardTitle className="text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <Icon className="w-5 h-5 text-emerald-500" />
          {topic.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <ul className="space-y-3">
              {topic.content.map((item, i) => (
                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {topic.quiz && (
              <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase mb-2">Quick Quiz</p>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{topic.quiz.q}</p>
                <p className="text-[10px] text-zinc-500 mt-2 italic">Answer: {topic.quiz.a}</p>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-500 italic">
                Tip: Trigger an incident to see how the "Incident Response" module works in real-time.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
