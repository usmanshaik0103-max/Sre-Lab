'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SRESimulator } from '@/components/sre-simulator';
import { RealTimeDashboard } from '@/components/dashboard/real-time-dashboard';
import { IncidentControlPanel } from '@/components/incident-control/control-panel';
import { AlertList } from '@/components/incident-management/alert-list';
import { RCAPanel } from '@/components/incident-management/rca-panel';
import { LogTerminal } from '@/components/terminal/log-terminal';
import { ThemeToggle } from '@/components/theme-toggle';
import { SRELearningHub } from '@/components/dashboard/sre-learning-hub';
import { LearningPanel } from '@/components/learning-panel';
import { useSREStore } from '@/lib/sre-store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
    LayoutDashboard, 
    Activity, 
    Settings, 
    Database, 
    ShieldAlert, 
    Terminal as TerminalIcon,
    HelpCircle,
    Bell,
    Search,
    Cpu,
    GraduationCap,
    Menu,
    Trophy,
    Zap
  } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'incidents' | 'logs' | 'training'>('dashboard');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearningPanelOpen, setIsLearningPanelOpen] = useState(false);
  const { incidents, sla, teachingMode, setTeachingMode, maturityLevel, experience } = useSREStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger level up notification
  useEffect(() => {
    if (mounted && maturityLevel > 0) {
      setShowLevelUp(true);
      const timer = setTimeout(() => setShowLevelUp(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [maturityLevel, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }
  
  const activeIncidents = incidents.filter(i => i.status !== 'resolved');

  const MATURITY_TITLES = [
    'Manual Ops Fresher',
    'Reactive SRE Apprentice',
    'Proactive SRE Specialist',
    'Automated Systems Engineer',
    'SRE Architect'
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          
          <span className="font-bold tracking-tighter text-lg">SRE Incident Response Command Center</span>
        </div>
      </div>

      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/50">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Level {maturityLevel}</span>
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">{experience} XP</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-200 mb-2 truncate">{MATURITY_TITLES[maturityLevel]}</p>
          <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500" 
              style={{ width: `${(experience % 250) / 2.5}%` }} 
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <NavItem 
          icon={<LayoutDashboard className="w-4 h-4" />} 
          label="Live Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
        />
        <NavItem 
          icon={<ShieldAlert className="w-4 h-4" />} 
          label="Incident Response" 
          active={activeTab === 'incidents'} 
          onClick={() => { setActiveTab('incidents'); setIsMobileMenuOpen(false); }}
          badge={activeIncidents.length > 0 ? activeIncidents.length : undefined}
        />
        <NavItem 
          icon={<TerminalIcon className="w-4 h-4" />} 
          label="System Logs" 
          active={activeTab === 'logs'} 
          onClick={() => { setActiveTab('logs'); setIsMobileMenuOpen(false); }} 
        />
        <NavItem 
          icon={<GraduationCap className="w-4 h-4" />} 
          label="SRE Training Hub" 
          active={activeTab === 'training'} 
          onClick={() => { setActiveTab('training'); setIsMobileMenuOpen(false); }} 
        />
        
        <div className="pt-6 pb-2 px-3">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Training Mode</span>
        </div>
        <button 
          onClick={() => setTeachingMode(!teachingMode)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
            teachingMode ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-xs font-bold">{teachingMode ? 'Learning Active' : 'Basic Mode'}</span>
        </button>
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">SLA Health</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500">{sla.toFixed(2)}%</span>
          </div>
          <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000" 
              style={{ width: `${sla}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans">
      <SRESimulator />
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-zinc-200 dark:border-zinc-800 flex-col bg-zinc-50 dark:bg-zinc-950 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-zinc-800 bg-zinc-950">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation for the SRE Incident Response Command Center platform</SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Learning Sheet for Mobile */}
      <Sheet open={isLearningPanelOpen} onOpenChange={setIsLearningPanelOpen}>
        <SheetContent side="right" className="p-0 w-80 md:w-96 border-l border-zinc-800 bg-zinc-950">
          <SheetHeader className="sr-only">
            <SheetTitle>Learning Center</SheetTitle>
            <SheetDescription>Educational resources and SRE concepts</SheetDescription>
          </SheetHeader>
          <div className="h-full overflow-y-auto">
            <LearningPanel />
          </div>
        </SheetContent>
      </Sheet>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950">
          <AnimatePresence>
            {showLevelUp && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
              >
                <Card className="bg-emerald-600 text-white p-4 shadow-2xl border-none flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">New Maturity Level</p>
                      <p className="text-sm font-bold">Reached Level {maturityLevel}!</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowLevelUp(false)}
                  >
                    Dismiss
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-zinc-500" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 truncate">
              {activeTab === 'dashboard' ? 'Telemetry' : activeTab === 'incidents' ? 'Incident Response' : activeTab === 'training' ? 'Training Hub' : 'Logs'}
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {teachingMode && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="xl:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                onClick={() => setIsLearningPanelOpen(true)}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Learning</span>
              </Button>
            )}
            <ThemeToggle />
            <div className="hidden sm:block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Lab Status: Online</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
              {activeTab === 'dashboard' && (
                <>
                  <RealTimeDashboard />
                  <IncidentControlPanel />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    <div className="lg:col-span-8 min-h-[300px] lg:h-[400px]">
                      <LogTerminal />
                    </div>
                    <div className="lg:col-span-4 min-h-[300px] lg:h-[400px]">
                      <AlertList onSelect={(id) => {
                        setSelectedIncidentId(id);
                        setActiveTab('incidents');
                      }} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'incidents' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 min-h-[600px]">
                  <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                    <AlertList onSelect={setSelectedIncidentId} />
                  </div>
                  <div className="lg:col-span-8 h-full">
                    <RCAPanel incidentId={selectedIncidentId} onClose={() => setSelectedIncidentId(null)} />
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]">
                  <LogTerminal />
                </div>
              )}

              {activeTab === 'training' && (
                <div className="min-h-[600px]">
                  <SRELearningHub />
                </div>
              )}
            </div>
          </div>

          {teachingMode && (
            <aside className="w-80 border-l border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950/50 overflow-y-auto custom-scrollbar hidden xl:block shrink-0">
              <LearningPanel />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick, badge }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
  badge?: number;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group",
        active ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300"
      )}
      suppressHydrationWarning
    >
      <div className="flex items-center gap-3">
        <span className={cn(
          "transition-colors",
          active ? "text-emerald-600 dark:text-emerald-500" : "group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
        )}>
          {icon}
        </span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      {badge !== undefined && (
        <Badge className="h-4 px-1 text-[10px] bg-rose-500 text-white border-none min-w-[16px] flex items-center justify-center">
          {badge}
        </Badge>
      )}
    </button>
  );
}
