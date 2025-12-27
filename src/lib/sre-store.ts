import { create } from 'zustand';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentType = 
  | 'cpu_spike' 
  | 'memory_leak' 
  | 'disk_saturation' 
  | 'network_loss' 
  | 'high_latency' 
  | 'error_rate_surge' 
  | 'pod_crash' 
  | 'service_down' 
  | 'db_exhaustion' 
  | 'cache_storm'
  | 'ddos_attack'
  | 'bad_deployment'
  | 'capacity_exhausted'
  | 'dns_outage';

export interface Deployment {
  id: string;
  timestamp: number;
  status: 'success' | 'failure';
  version: string;
  type: 'normal' | 'canary' | 'hotfix';
}

export interface Incident {
  id: string;
  type: IncidentType;
  status: 'active' | 'resolved' | 'investigating' | 'remediating';
  severity: Severity;
  startTime: number;
  endTime?: number;
  description: string;
  service: string;
  isToil?: boolean;
  rca?: {
    cause: string;
    confidence: number;
    explanation: string;
    learningSteps?: { step: number; title: string; description: string }[];
  };
  remediation?: {
    steps: string[];
    action: string;
    learningExplanation?: string;
  };
  timeline: { timestamp: number; event: string }[];
}

export interface Metrics {
  cpu: number;
  memory: number;
  disk: number;
  latency: number;
  errorRate: number;
  network: number;
  dbConnections: number;
  podCount: number;
  traffic: number; // RPS
}

export interface Decision {
  id: string;
  timestamp: number;
  decision: string;
  reason: string;
  outcome: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Checkpoint {
  id: string;
  title: string;
  concept: string;
  completed: boolean;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SREState {
  metrics: Metrics;
  history: Metrics[];
  incidents: Incident[];
  autoSreMode: boolean;
  teachingMode: boolean;
  learningTopic: string | null;
  logs: { timestamp: number; message: string; type: 'info' | 'warn' | 'error' | 'success' }[];
  sla: number;
  errorBudget: number; // 0-100
  
  // Advanced SRE States
  toilTime: number; 
  toilCount: number;
  automationSavings: number;
  budgetHistory: { timestamp: number; budget: number }[];
  costPerIncident: number;
  totalCost: number;
  infrastructureCost: number;
  
  experience: number;
  maturityLevel: number;
  deployments: Deployment[];
  
  // New Advanced Features
  featureVelocity: number; // 0-100
  userSatisfaction: number; // 0-100
    failedUserActions: number;
    loadDelay: number; // ms
    chaosMode: boolean;
    activePlaybook: string | null;
    playbookProgress: number;
    commandsExecuted: string[];
    checkpoints: Checkpoint[];
    decisionLog: Decision[];
    reliabilityScore: number;

  mttd: number; // Mean Time To Detect
  mttr: number; // Mean Time To Resolve
  
  // On-call and Alerting
  onCallShiftActive: boolean;
  alertNoiseLevel: number;
  missedCriticalAlerts: number;
  
  // Actions
  updateMetrics: (newMetrics: Metrics) => void;
  triggerIncident: (incident: Omit<Incident, 'id' | 'startTime' | 'timeline' | 'status'>) => void;
  resolveIncident: (id: string, isManual?: boolean) => void;
  toggleAutoSre: () => void;
  setTeachingMode: (mode: boolean) => void;
  setLearningTopic: (topic: string | null) => void;
  addLog: (message: string, type?: 'info' | 'warn' | 'error' | 'success') => void;
  setIncidentStatus: (id: string, status: Incident['status']) => void;
  performDeployment: (type: Deployment['type']) => void;
  scaleService: (amount: number) => void;
  resetLab: () => void;
  
  // New Actions
  setFeatureVelocity: (velocity: number) => void;
  toggleChaosMode: () => void;
  addDecision: (decision: Omit<Decision, 'id' | 'timestamp'>) => void;
  completeCheckpoint: (id: string) => void;
    setActivePlaybook: (id: string | null) => void;
    onCommand: (command: string) => void;
  }


export const useSREStore = create<SREState>((set) => ({
  metrics: {
    cpu: 15,
    memory: 42,
    disk: 28,
    latency: 120,
    errorRate: 0.02,
    network: 450,
    dbConnections: 12,
    podCount: 5,
    traffic: 1000,
  },
  history: [],
  incidents: [],
  autoSreMode: false,
  teachingMode: true,
  learningTopic: 'monitoring',
  logs: [],
  sla: 99.99,
  errorBudget: 100,
  toilTime: 0,
  toilCount: 0,
  automationSavings: 0,
  budgetHistory: [],
  costPerIncident: 500,
  totalCost: 0,
  infrastructureCost: 0,
  experience: 0,
  maturityLevel: 0,
  deployments: [],
  
  featureVelocity: 50,
  userSatisfaction: 98,
  failedUserActions: 0,
    loadDelay: 0,
    chaosMode: false,
    activePlaybook: null,
    playbookProgress: 0,
    commandsExecuted: [],
    decisionLog: [],
    reliabilityScore: 100,

  mttd: 0,
  mttr: 0,
  checkpoints: [
    {
      id: 'cp-1',
      title: 'Reliability vs Velocity',
      concept: 'The Error Budget',
      completed: false,
      question: 'When should you pause new feature releases in SRE?',
      options: [
        'Whenever an incident occurs',
        'When the error budget is exhausted',
        'When the developers are tired',
        'Every Friday'
      ],
      correctAnswer: 1,
      explanation: 'Error budgets define the balance between reliability and speed. If you run out of budget, you prioritize stability.'
    },
    {
      id: 'cp-2',
      title: 'Toil Management',
      concept: 'Toil vs Engineering',
      completed: false,
      question: 'Which of these is considered "Toil"?',
      options: [
        'Designing a new backup system',
        'Writing a postmortem',
        'Manually restarting a service every hour',
        'Implementing a new monitoring dashboard'
      ],
      correctAnswer: 2,
      explanation: 'Toil is manual, repetitive, automatable work that lacks enduring value.'
    }
  ],
  
  onCallShiftActive: true,
  alertNoiseLevel: 30,
  missedCriticalAlerts: 0,

  updateMetrics: (newMetrics) => set((state) => {
    // Velocity impact: High velocity increases risk of incidents and latency
    const riskFactor = state.featureVelocity / 100;
    const modifiedMetrics = { ...newMetrics };
    
    if (state.chaosMode && Math.random() < 0.05) {
      modifiedMetrics.errorRate += Math.random() * 5;
      modifiedMetrics.latency += Math.random() * 200;
    }

    // Consume error budget if metrics are bad
    let budgetImpact = 0;
    if (modifiedMetrics.errorRate > 1) budgetImpact += 0.2 * (1 + riskFactor);
    if (modifiedMetrics.latency > 500) budgetImpact += 0.1 * (1 + riskFactor);
    if (modifiedMetrics.cpu > 95) budgetImpact += 0.05;
    
    const newBudget = Math.max(0, state.errorBudget - budgetImpact);
    const newSLA = Math.max(0, state.sla - (budgetImpact / 100));

    // User satisfaction impact
    const satisfactionImpact = (modifiedMetrics.errorRate * 0.5) + (modifiedMetrics.latency / 1000);
    const newUserSatisfaction = Math.max(0, Math.min(100, state.userSatisfaction - (satisfactionImpact * 0.1) + 0.01));
    const newFailedActions = state.failedUserActions + (modifiedMetrics.errorRate > 5 ? 1 : 0);
    const newLoadDelay = modifiedMetrics.latency > 300 ? modifiedMetrics.latency - 300 : 0;

    // Reliability Score calculation
    const newReliabilityScore = Math.max(0, 100 - (state.incidents.filter(i => i.status !== 'resolved').length * 10) - (100 - newBudget));

    // Costs
    const incidentCost = (state.incidents.filter(i => i.status !== 'resolved').length * state.costPerIncident) / 60;
    const currentInfrastructureCost = (modifiedMetrics.podCount * 0.01) + (state.featureVelocity * 0.005);
    const newTotalCost = state.totalCost + incidentCost + currentInfrastructureCost;

    const newBudgetHistory = [...state.budgetHistory, { timestamp: Date.now(), budget: newBudget }].slice(-60);
    const historyEntry = { ...modifiedMetrics, errorBudget: newBudget };
    const newHistory = [...state.history, historyEntry].slice(-60);

    return { 
      metrics: modifiedMetrics, 
      history: newHistory,
      errorBudget: newBudget,
      sla: newSLA,
      totalCost: newTotalCost,
      infrastructureCost: currentInfrastructureCost,
      budgetHistory: newBudgetHistory,
      userSatisfaction: newUserSatisfaction,
      failedUserActions: newFailedActions,
      loadDelay: newLoadDelay,
      reliabilityScore: newReliabilityScore
    };
  }),

  triggerIncident: (incidentData) => set((state) => {
    const id = Math.random().toString(36).substring(7);
    const newIncident: Incident = {
      ...incidentData,
      id,
      status: 'active',
      startTime: Date.now(),
      timeline: [{ timestamp: Date.now(), event: `Incident detected: ${incidentData.description}` }],
      isToil: true
    };
    
    return {
      incidents: [newIncident, ...state.incidents],
      learningTopic: incidentData.type === 'bad_deployment' ? 'change_management' : 'incidents',
      logs: [{ 
        timestamp: Date.now(), 
        message: `ALERT [${incidentData.severity.toUpperCase()}]: ${incidentData.description}`, 
        type: incidentData.severity === 'critical' || incidentData.severity === 'high' ? 'error' : 'warn' 
      }, ...state.logs].slice(0, 100)
    };
  }),

  resolveIncident: (id, isManual = true) => set((state) => {
    const incident = state.incidents.find(inc => inc.id === id);
    if (!incident || incident.status === 'resolved') return state;

    const duration = (Date.now() - incident.startTime) / 1000;
    const newMttr = state.mttr === 0 ? duration : (state.mttr + duration) / 2;

    const baseXP = incident.severity === 'critical' ? 50 : 20;
    const manualPenalty = isManual ? 0 : 10;
    const newExperience = state.experience + baseXP + manualPenalty;
    const newMaturity = Math.floor(newExperience / 250);

    return {
      incidents: state.incidents.map((inc) => 
        inc.id === id 
          ? { 
              ...inc, 
              status: 'resolved', 
              endTime: Date.now(), 
              timeline: [...inc.timeline, { timestamp: Date.now(), event: 'Incident resolved.' }] 
            } 
          : inc
      ),
      toilCount: state.toilCount + (isManual ? 1 : 0),
      experience: newExperience,
      maturityLevel: Math.min(4, newMaturity),
      mttr: newMttr,
      logs: [{ 
        timestamp: Date.now(), 
        message: `RESOLVED: Incident ${id} resolved in ${duration.toFixed(0)}s.`, 
        type: 'success' 
      }, ...state.logs].slice(0, 100)
    };
  }),

  performDeployment: (type) => set((state) => {
    const id = Math.random().toString(36).substring(7);
    const failureRate = (type === 'canary' ? 0.05 : type === 'hotfix' ? 0.1 : 0.3) * (1 + state.featureVelocity / 100);
    const isFailure = Math.random() < failureRate;
    
    const newDeployment: Deployment = {
      id,
      timestamp: Date.now(),
      status: isFailure ? 'failure' : 'success',
      version: `v1.${state.deployments.length + 1}.0`,
      type
    };

    if (isFailure) {
      setTimeout(() => {
        useSREStore.getState().triggerIncident({
          type: 'bad_deployment',
          severity: 'high',
          description: `Failed deployment of ${newDeployment.version}`,
          service: 'API-Gateway'
        });
      }, 2000);
    }

    return {
      deployments: [newDeployment, ...state.deployments],
      logs: [{ 
        timestamp: Date.now(), 
        message: `DEPLOYMENT [${type.toUpperCase()}]: Version ${newDeployment.version} ${isFailure ? 'FAILED' : 'SUCCESSFUL'}`, 
        type: isFailure ? 'error' : 'success' 
      }, ...state.logs].slice(0, 100)
    };
  }),

  scaleService: (amount) => set((state) => ({
    metrics: { ...state.metrics, podCount: Math.max(1, state.metrics.podCount + amount) },
    toilCount: state.toilCount + 1,
    addDecision: {
      decision: `Scale service by ${amount}`,
      reason: 'Scaling pods to meet demand',
      outcome: `Pod count is now ${state.metrics.podCount + amount}`,
      impact: 'neutral'
    }
  })),

  resetLab: () => set((state) => ({
    incidents: [],
    logs: [],
    experience: 0,
    maturityLevel: 0,
    toilTime: 0,
    toilCount: 0,
    errorBudget: 100,
    sla: 99.99,
    deployments: [],
    totalCost: 0,
    userSatisfaction: 98,
    decisionLog: [],
    reliabilityScore: 100
  })),

  setFeatureVelocity: (velocity) => set({ featureVelocity: velocity }),
  toggleChaosMode: () => set((state) => ({ chaosMode: !state.chaosMode })),
  setActivePlaybook: (activePlaybook) => set({ activePlaybook }),
  
  addDecision: (decisionData) => set((state) => ({
    decisionLog: [{
      ...decisionData,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now()
    }, ...state.decisionLog].slice(0, 50)
  })),

    completeCheckpoint: (id) => set((state) => ({
      checkpoints: state.checkpoints.map(cp => cp.id === id ? { ...cp, completed: true } : cp),
      experience: state.experience + 30
    })),

    onCommand: (command) => set((state) => {
      const newCommands = [...state.commandsExecuted, command.toLowerCase()];
      let newProgress = state.playbookProgress;
      
      // Handle playbook progression logic
      if (state.activePlaybook) {
        // Simple logic: if they run any command, we progress for now to keep it fun
        // In a real app we'd check for specific commands like 'kubectl get pods'
        newProgress = Math.min(100, state.playbookProgress + 25);
      }

      return {
        commandsExecuted: newCommands,
        playbookProgress: newProgress
      };
    }),


  setIncidentStatus: (id, status) => set((state) => ({
    incidents: state.incidents.map((inc) => 
      inc.id === id 
        ? { 
            ...inc, 
            status, 
            timeline: [...inc.timeline, { timestamp: Date.now(), event: `Status changed to ${status}` }] 
          } 
        : inc
    )
  })),

toggleAutoSre: () => set((state) => ({ autoSreMode: !state.autoSreMode })),
setTeachingMode: (teachingMode) => set({ teachingMode }),
setLearningTopic: (learningTopic) => set({ learningTopic }),
addLog: (message, type = 'info') => set((state) => ({
  logs: [{ timestamp: Date.now(), message, type }, ...state.logs].slice(0, 100),
})),
}));
