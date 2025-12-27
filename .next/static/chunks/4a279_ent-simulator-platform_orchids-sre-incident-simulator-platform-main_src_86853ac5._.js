(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSREStore": (()=>useSREStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useSREStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        metrics: {
            cpu: 15,
            memory: 42,
            disk: 28,
            latency: 120,
            errorRate: 0.02,
            network: 450,
            dbConnections: 12,
            podCount: 5,
            traffic: 1000
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
        updateMetrics: (newMetrics)=>set((state)=>{
                // Velocity impact: High velocity increases risk of incidents and latency
                const riskFactor = state.featureVelocity / 100;
                const modifiedMetrics = {
                    ...newMetrics
                };
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
                const newSLA = Math.max(0, state.sla - budgetImpact / 100);
                // User satisfaction impact
                const satisfactionImpact = modifiedMetrics.errorRate * 0.5 + modifiedMetrics.latency / 1000;
                const newUserSatisfaction = Math.max(0, Math.min(100, state.userSatisfaction - satisfactionImpact * 0.1 + 0.01));
                const newFailedActions = state.failedUserActions + (modifiedMetrics.errorRate > 5 ? 1 : 0);
                const newLoadDelay = modifiedMetrics.latency > 300 ? modifiedMetrics.latency - 300 : 0;
                // Reliability Score calculation
                const newReliabilityScore = Math.max(0, 100 - state.incidents.filter((i)=>i.status !== 'resolved').length * 10 - (100 - newBudget));
                // Costs
                const incidentCost = state.incidents.filter((i)=>i.status !== 'resolved').length * state.costPerIncident / 60;
                const currentInfrastructureCost = modifiedMetrics.podCount * 0.01 + state.featureVelocity * 0.005;
                const newTotalCost = state.totalCost + incidentCost + currentInfrastructureCost;
                const newBudgetHistory = [
                    ...state.budgetHistory,
                    {
                        timestamp: Date.now(),
                        budget: newBudget
                    }
                ].slice(-60);
                const historyEntry = {
                    ...modifiedMetrics,
                    errorBudget: newBudget
                };
                const newHistory = [
                    ...state.history,
                    historyEntry
                ].slice(-60);
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
        triggerIncident: (incidentData)=>set((state)=>{
                const id = Math.random().toString(36).substring(7);
                const newIncident = {
                    ...incidentData,
                    id,
                    status: 'active',
                    startTime: Date.now(),
                    timeline: [
                        {
                            timestamp: Date.now(),
                            event: `Incident detected: ${incidentData.description}`
                        }
                    ],
                    isToil: true
                };
                return {
                    incidents: [
                        newIncident,
                        ...state.incidents
                    ],
                    learningTopic: incidentData.type === 'bad_deployment' ? 'change_management' : 'incidents',
                    logs: [
                        {
                            timestamp: Date.now(),
                            message: `ALERT [${incidentData.severity.toUpperCase()}]: ${incidentData.description}`,
                            type: incidentData.severity === 'critical' || incidentData.severity === 'high' ? 'error' : 'warn'
                        },
                        ...state.logs
                    ].slice(0, 100)
                };
            }),
        resolveIncident: (id, isManual = true)=>set((state)=>{
                const incident = state.incidents.find((inc)=>inc.id === id);
                if (!incident || incident.status === 'resolved') return state;
                const duration = (Date.now() - incident.startTime) / 1000;
                const newMttr = state.mttr === 0 ? duration : (state.mttr + duration) / 2;
                const baseXP = incident.severity === 'critical' ? 50 : 20;
                const manualPenalty = isManual ? 0 : 10;
                const newExperience = state.experience + baseXP + manualPenalty;
                const newMaturity = Math.floor(newExperience / 250);
                return {
                    incidents: state.incidents.map((inc)=>inc.id === id ? {
                            ...inc,
                            status: 'resolved',
                            endTime: Date.now(),
                            timeline: [
                                ...inc.timeline,
                                {
                                    timestamp: Date.now(),
                                    event: 'Incident resolved.'
                                }
                            ]
                        } : inc),
                    toilCount: state.toilCount + (isManual ? 1 : 0),
                    experience: newExperience,
                    maturityLevel: Math.min(4, newMaturity),
                    mttr: newMttr,
                    logs: [
                        {
                            timestamp: Date.now(),
                            message: `RESOLVED: Incident ${id} resolved in ${duration.toFixed(0)}s.`,
                            type: 'success'
                        },
                        ...state.logs
                    ].slice(0, 100)
                };
            }),
        performDeployment: (type)=>set((state)=>{
                const id = Math.random().toString(36).substring(7);
                const failureRate = (type === 'canary' ? 0.05 : type === 'hotfix' ? 0.1 : 0.3) * (1 + state.featureVelocity / 100);
                const isFailure = Math.random() < failureRate;
                const newDeployment = {
                    id,
                    timestamp: Date.now(),
                    status: isFailure ? 'failure' : 'success',
                    version: `v1.${state.deployments.length + 1}.0`,
                    type
                };
                if (isFailure) {
                    setTimeout(()=>{
                        useSREStore.getState().triggerIncident({
                            type: 'bad_deployment',
                            severity: 'high',
                            description: `Failed deployment of ${newDeployment.version}`,
                            service: 'API-Gateway'
                        });
                    }, 2000);
                }
                return {
                    deployments: [
                        newDeployment,
                        ...state.deployments
                    ],
                    logs: [
                        {
                            timestamp: Date.now(),
                            message: `DEPLOYMENT [${type.toUpperCase()}]: Version ${newDeployment.version} ${isFailure ? 'FAILED' : 'SUCCESSFUL'}`,
                            type: isFailure ? 'error' : 'success'
                        },
                        ...state.logs
                    ].slice(0, 100)
                };
            }),
        scaleService: (amount)=>set((state)=>({
                    metrics: {
                        ...state.metrics,
                        podCount: Math.max(1, state.metrics.podCount + amount)
                    },
                    toilCount: state.toilCount + 1,
                    addDecision: {
                        decision: `Scale service by ${amount}`,
                        reason: 'Scaling pods to meet demand',
                        outcome: `Pod count is now ${state.metrics.podCount + amount}`,
                        impact: 'neutral'
                    }
                })),
        resetLab: ()=>set((state)=>({
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
        setFeatureVelocity: (velocity)=>set({
                featureVelocity: velocity
            }),
        toggleChaosMode: ()=>set((state)=>({
                    chaosMode: !state.chaosMode
                })),
        setActivePlaybook: (activePlaybook)=>set({
                activePlaybook
            }),
        addDecision: (decisionData)=>set((state)=>({
                    decisionLog: [
                        {
                            ...decisionData,
                            id: Math.random().toString(36).substring(7),
                            timestamp: Date.now()
                        },
                        ...state.decisionLog
                    ].slice(0, 50)
                })),
        completeCheckpoint: (id)=>set((state)=>({
                    checkpoints: state.checkpoints.map((cp)=>cp.id === id ? {
                            ...cp,
                            completed: true
                        } : cp),
                    experience: state.experience + 30
                })),
        onCommand: (command)=>set((state)=>{
                const newCommands = [
                    ...state.commandsExecuted,
                    command.toLowerCase()
                ];
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
        setIncidentStatus: (id, status)=>set((state)=>({
                    incidents: state.incidents.map((inc)=>inc.id === id ? {
                            ...inc,
                            status,
                            timeline: [
                                ...inc.timeline,
                                {
                                    timestamp: Date.now(),
                                    event: `Status changed to ${status}`
                                }
                            ]
                        } : inc)
                })),
        toggleAutoSre: ()=>set((state)=>({
                    autoSreMode: !state.autoSreMode
                })),
        setTeachingMode: (teachingMode)=>set({
                teachingMode
            }),
        setLearningTopic: (learningTopic)=>set({
                learningTopic
            }),
        addLog: (message, type = 'info')=>set((state)=>({
                    logs: [
                        {
                            timestamp: Date.now(),
                            message,
                            type
                        },
                        ...state.logs
                    ].slice(0, 100)
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "INCIDENT_CONFIGS": (()=>INCIDENT_CONFIGS),
    "getRCA": (()=>getRCA),
    "getRemediation": (()=>getRemediation)
});
const INCIDENT_CONFIGS = {
    cpu_spike: {
        description: 'Unexpected CPU utilization spike on API nodes',
        severity: 'high',
        service: 'api-gateway',
        beginnerDescription: 'The server is working too hard processing requests. Think of it like a chef being overwhelmed with 100 orders at once.'
    },
    memory_leak: {
        description: 'Memory leak detected in worker process',
        severity: 'medium',
        service: 'payment-worker',
        beginnerDescription: 'The system is forgetting to "clean up" after itself. It keeps taking more and more memory space until it runs out.'
    },
    disk_saturation: {
        description: 'Disk I/O saturation on database volume',
        severity: 'high',
        service: 'postgresql-db',
        beginnerDescription: 'The storage disk is too busy reading and writing data. It is like trying to read a book while someone is constantly turning the pages.'
    },
    network_loss: {
        description: 'Increased packet loss in regional VPC',
        severity: 'critical',
        service: 'networking',
        beginnerDescription: 'Data is getting lost as it travels between servers. It is like a mail truck losing packages on the highway.'
    },
    high_latency: {
        description: 'P99 latency exceeding SLO thresholds',
        severity: 'medium',
        service: 'frontend-app',
        beginnerDescription: 'The website is responding very slowly. Users are waiting a long time for the page to load.'
    },
    error_rate_surge: {
        description: '5xx error rate surge in user-auth service',
        severity: 'critical',
        service: 'user-auth',
        beginnerDescription: 'The server is crashing or failing to process requests, sending back "Error" messages to users.'
    },
    pod_crash: {
        description: 'Kubelet reporting CrashLoopBackOff for ingress-controller',
        severity: 'high',
        service: 'k8s-ingress',
        beginnerDescription: 'A small part of the system (a "Pod") keeps crashing and trying to restart over and over.'
    },
    service_down: {
        description: 'Service "inventory-service" is unreachable',
        severity: 'critical',
        service: 'inventory-service',
        beginnerDescription: 'An entire part of the application is completely offline. Users cannot access this feature at all.'
    },
    db_exhaustion: {
        description: 'Database connection pool exhausted',
        severity: 'high',
        service: 'postgresql-db',
        beginnerDescription: 'Too many people are trying to talk to the database at once, and there are no "phone lines" left open.'
    },
    cache_storm: {
        description: 'Cache miss storm following Redis eviction',
        severity: 'medium',
        service: 'redis-cache',
        beginnerDescription: 'The fast temporary storage (cache) was cleared, so now every request has to go to the slow main database at once.'
    },
    ddos_attack: {
        description: 'High volume of suspicious traffic detected from botnet',
        severity: 'critical',
        service: 'edge-proxy',
        beginnerDescription: 'A "DDoS" is like 10,000 people trying to walk through a single door at the same time, blocking real customers from entering.'
    },
    bad_deployment: {
        description: 'Newly deployed code is failing health checks',
        severity: 'high',
        service: 'api-gateway',
        beginnerDescription: 'A recent change to the software was broken. It is like a new update to your phone making the battery die in 5 minutes.'
    },
    capacity_exhausted: {
        description: 'Resource usage exceeded provisioned capacity limits',
        severity: 'high',
        service: 'frontend-app',
        beginnerDescription: 'The system has reached its limit. It is like a crowded elevator that cannot take any more people without breaking.'
    },
    dns_outage: {
        description: 'Internal DNS resolution is failing globally',
        severity: 'critical',
        service: 'networking',
        beginnerDescription: 'The system "address book" is lost. Even if the servers are fine, no one can find their "phone numbers" to talk to them.'
    }
};
function getRCA(type) {
    const causes = {
        cpu_spike: {
            cause: 'Unoptimized Query Execution',
            confidence: 0.85,
            explanation: 'Increased CPU load correlated with a deployment of a new reporting module. Large table scans are consuming cycles.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Metric Anomaly',
                    description: 'Notice the CPU usage jumped from 15% to 85% suddenly.'
                },
                {
                    step: 2,
                    title: 'Correlation',
                    description: 'SREs check logs and see this matches a new code deployment.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The new code has a "Search" feature that doesn\'t use an index, forcing the CPU to scan every row.'
                }
            ]
        },
        memory_leak: {
            cause: 'Closure Reference Leak',
            confidence: 0.92,
            explanation: 'Heap snapshots show a growing number of uncollected objects in the event listener array of the worker process.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Steady Growth',
                    description: 'Memory usage is slowly climbing in a straight line, never going down.'
                },
                {
                    step: 2,
                    title: 'Health Check',
                    description: 'SREs notice the service restarts every 4 hours because it runs out of RAM.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'A variable in the code is holding onto data it no longer needs, "leaking" memory.'
                }
            ]
        },
        disk_saturation: {
            cause: 'Log Rotation Failure',
            confidence: 0.78,
            explanation: 'Access logs are not being rotated correctly, causing the root partition to fill up and slowing down I/O operations.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Disk Usage',
                    description: 'The disk space alert triggered at 90% capacity.'
                },
                {
                    step: 2,
                    title: 'I/O Wait',
                    description: 'Because the disk is full, the system takes longer to write new data.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The system forgot to delete old log files, filling up the storage "cabinet".'
                }
            ]
        },
        network_loss: {
            cause: 'Cloud Provider Interruption',
            confidence: 0.65,
            explanation: 'Packet loss detected across multiple Availability Zones. Correlated with provider status alerts in us-east-1.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Connectivity Drop',
                    description: 'Multiple services suddenly can\'t talk to each other.'
                },
                {
                    step: 2,
                    title: 'External Check',
                    description: 'SREs check the AWS/Azure status page and see an outage.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'A physical fiber optic cable was damaged at the data center.'
                }
            ]
        },
        high_latency: {
            cause: 'Upstream Service Bottleneck',
            confidence: 0.88,
            explanation: 'Latency in the frontend service matches exactly with response time increases in the checkout-service API.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Slow Response',
                    description: 'The "Time to First Byte" metric increased by 2 seconds.'
                },
                {
                    step: 2,
                    title: 'Trace Analysis',
                    description: 'Looking at a "Trace", we see the Frontend is waiting on the Backend.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The Backend service is slow, causing a "waterfall" effect of slowness.'
                }
            ]
        },
        error_rate_surge: {
            cause: 'Incorrect Environment Secret',
            confidence: 0.95,
            explanation: 'Authentication service is failing to connect to the DB due to an invalid TLS certificate path in the latest deployment config.',
            learningSteps: [
                {
                    step: 1,
                    title: '5xx Errors',
                    description: 'The Error Rate chart is showing a huge spike in red.'
                },
                {
                    step: 2,
                    title: 'Log Inspection',
                    description: 'Logs show "Access Denied" or "Invalid Password" errors.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'A developer updated a password but forgot to update it in the server settings.'
                }
            ]
        },
        pod_crash: {
            cause: 'Resource Limit Exceeded',
            confidence: 0.82,
            explanation: 'OOM Killer terminated the process. The pod requested 256Mi but attempted to use 512Mi during peak traffic.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Restart Loop',
                    description: 'Kubernetes shows the pod status as "CrashLoopBackOff".'
                },
                {
                    step: 2,
                    title: 'Events View',
                    description: 'The system events say "OOMKilled" (Out Of Memory Killed).'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The container tried to use more memory than we allowed it to have.'
                }
            ]
        },
        service_down: {
            cause: 'DNS Resolution Failure',
            confidence: 0.74,
            explanation: 'Internal service discovery is failing to resolve the hostname. Possibly a CoreDNS config issue.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Zero Traffic',
                    description: 'Requests to the service are failing with "Host Not Found".'
                },
                {
                    step: 2,
                    title: 'Network Test',
                    description: 'Trying to ping the service manually also fails.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The system "address book" (DNS) is broken, so it can\'t find the service.'
                }
            ]
        },
        db_exhaustion: {
            cause: 'Zombie Connection Leak',
            confidence: 0.91,
            explanation: 'Client applications are not properly closing connections in the finally block of the data access layer.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Connection Alert',
                    description: 'Database connections hit the maximum limit of 100.'
                },
                {
                    step: 2,
                    title: 'Wait Queue',
                    description: 'New requests are waiting in a queue to talk to the DB.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The application is opening "doors" to the DB but never closing them.'
                }
            ]
        },
        cache_storm: {
            cause: 'Massive Key Expiration',
            confidence: 0.84,
            explanation: 'TTL settings for product catalog keys were set to the same value, causing simultaneous expiration and DB thundering herd.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Cache Miss',
                    description: 'Suddenly, the cache hit rate dropped from 99% to 10%.'
                },
                {
                    step: 2,
                    title: 'DB Load',
                    description: 'The Database CPU spiked because it\'s doing all the work now.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'All the "shortcuts" expired at the exact same second.'
                }
            ]
        },
        ddos_attack: {
            cause: 'Malicious Traffic Spike',
            confidence: 0.98,
            explanation: 'Traffic analysis shows 95% of requests coming from a distributed set of IPs targeting the search endpoint.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Traffic Spike',
                    description: 'RPS increased from 1,000 to 50,000 in 10 seconds.'
                },
                {
                    step: 2,
                    title: 'Impact',
                    description: 'The system can\'t handle this many people trying to use it at once.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'Bad actors are intentionally overwhelming our servers with fake traffic.'
                }
            ]
        },
        bad_deployment: {
            cause: 'Code Regression',
            confidence: 1.0,
            explanation: 'Errors started immediately following deployment of v1.4.2. Rollback to v1.4.1 resolved the issue.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Deployment',
                    description: 'A new version of the code was just released.'
                },
                {
                    step: 2,
                    title: 'Immediate Failure',
                    description: 'The error rate chart turned solid red right after the release.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The new code contains a bug that prevents it from working.'
                }
            ]
        },
        capacity_exhausted: {
            cause: 'Organic Growth Overload',
            confidence: 0.89,
            explanation: 'The system is hitting its natural limits because too many real users are accessing it at once.',
            learningSteps: [
                {
                    step: 1,
                    title: 'High Usage',
                    description: 'Everything is slow because there are so many users.'
                },
                {
                    step: 2,
                    title: 'Scaling Limit',
                    description: 'We tried to add more servers but we hit our cloud provider\'s limit.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The application is more popular than our current infrastructure can support.'
                }
            ]
        },
        dns_outage: {
            cause: 'Domain Expiration',
            confidence: 0.99,
            explanation: 'WHOIS lookups show the internal domain service.local has expired or been misconfigured.',
            learningSteps: [
                {
                    step: 1,
                    title: 'Total Silence',
                    description: 'No services can talk to each other anymore.'
                },
                {
                    step: 2,
                    title: 'Lookup Failure',
                    description: 'The servers are asking "Who is api-gateway?" and getting no answer.'
                },
                {
                    step: 3,
                    title: 'Root Cause',
                    description: 'The internet "address book" service is broken or inaccessible.'
                }
            ]
        }
    };
    return causes[type];
}
function getRemediation(type) {
    const steps = {
        cpu_spike: {
            steps: [
                'Identify long-running queries',
                'Add indexes to affected tables',
                'Horizontal scale API nodes'
            ],
            action: 'Scale Replicas',
            learningExplanation: 'By adding more servers (replicas), we share the heavy workload among more "workers", reducing the stress on each one.'
        },
        memory_leak: {
            steps: [
                'Capture heap profile',
                'Identify leaking module',
                'Rolling restart workers'
            ],
            action: 'Restart Pods',
            learningExplanation: 'Restarting the service is like "turning it off and on again". it clears the leaked memory and gives the app a fresh start.'
        },
        disk_saturation: {
            steps: [
                'Purge temporary files',
                'Fix logrotate configuration',
                'Increase EBS volume size'
            ],
            action: 'Clear Disk',
            learningExplanation: 'We delete old log files that aren\'t needed anymore, making room for new data to be written quickly.'
        },
        network_loss: {
            steps: [
                'Reroute traffic to us-west-2',
                'Engage provider support',
                'Monitor VPC peering'
            ],
            action: 'Failover Region',
            learningExplanation: 'If one data center is broken, we "failover" or move all our users to a different, healthy data center in another city.'
        },
        high_latency: {
            steps: [
                'Enable CDN caching',
                'Optimize payload size',
                'Implement circuit breaker'
            ],
            action: 'Apply Circuit Breaker',
            learningExplanation: 'A circuit breaker stops requests to a slow service so it doesn\'t crash. It "fails fast" instead of making users wait forever.'
        },
        error_rate_surge: {
            steps: [
                'Verify env variables',
                'Check DB connectivity',
                'Rollback to v1.2.4'
            ],
            action: 'Rollback Deployment',
            learningExplanation: 'Rollback means "undo". We go back to the previous version of the code that we know worked perfectly.'
        },
        pod_crash: {
            steps: [
                'Check container logs',
                'Increase memory limits',
                'Verify startup probe'
            ],
            action: 'Increase Limits',
            learningExplanation: 'We give the service more "room to breathe" by increasing its allowed CPU or Memory limits in the settings.'
        },
        service_down: {
            steps: [
                'Verify service status',
                'Restart ingress controller',
                'Update DNS records'
            ],
            action: 'Restart Service',
            learningExplanation: 'We manually trigger a restart of the core service to reset its network connections and internal state.'
        },
        db_exhaustion: {
            steps: [
                'Kill idle connections',
                'Increase max_connections',
                'Implement connection pooling'
            ],
            action: 'Flush Connections',
            learningExplanation: 'We force-close all the "zombie" connections that aren\'t doing anything, freeing up slots for new users.'
        },
        cache_storm: {
            steps: [
                'Re-populate cache with jitter',
                'Increase Redis memory',
                'Implement request collapsing'
            ],
            action: 'Repopulate Cache',
            learningExplanation: 'We slowly put the shortcuts back into the cache so the database doesn\'t get overwhelmed by too much work at once.'
        },
        ddos_attack: {
            steps: [
                'Enable WAF rate limiting',
                'Block malicious IP ranges',
                'Activate Under Attack mode'
            ],
            action: 'Enable Rate Limiting',
            learningExplanation: 'Rate limiting says "you can only visit this many times per minute". This stops bots from overloading the server while letting real users through.'
        },
        bad_deployment: {
            steps: [
                'Verify commit history',
                'Analyze failed tests',
                'Rollback to stable'
            ],
            action: 'Rollback Release',
            learningExplanation: 'We immediately undo the latest change because it is causing problems for our users.'
        },
        capacity_exhausted: {
            steps: [
                'Auto-scale horizontally',
                'Optimize resource requests',
                'Upgrade instance type'
            ],
            action: 'Scale Horizontally',
            learningExplanation: 'We add more servers to handle the increased number of users. It is like opening more checkout lanes at a busy grocery store.'
        },
        dns_outage: {
            steps: [
                'Check domain expiration',
                'Update name servers',
                'Flush local DNS cache'
            ],
            action: 'Fix DNS Config',
            learningExplanation: 'We fix the address book so the servers can find each other again and resume normal communication.'
        }
    };
    return steps[type];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/sre-simulator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SRESimulator": (()=>SRESimulator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const BASE_METRICS = {
    cpu: 15,
    memory: 42,
    disk: 28,
    latency: 120,
    errorRate: 0.02,
    network: 450,
    dbConnections: 12,
    podCount: 5,
    traffic: 1000
};
function SRESimulator() {
    _s();
    const { metrics, incidents, autoSreMode, updateMetrics, triggerIncident, addLog, deployments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SRESimulator.useEffect": ()=>{
            timerRef.current = setInterval({
                "SRESimulator.useEffect": ()=>{
                    const activeIncidents = incidents.filter({
                        "SRESimulator.useEffect.activeIncidents": (inc)=>inc.status !== 'resolved'
                    }["SRESimulator.useEffect.activeIncidents"]);
                    // Check for bad deployments and trigger incidents
                    const latestDeployment = deployments[0];
                    if (latestDeployment && latestDeployment.status === 'failure' && Date.now() - latestDeployment.timestamp < 5000 && !activeIncidents.some({
                        "SRESimulator.useEffect": (i)=>i.type === 'bad_deployment'
                    }["SRESimulator.useEffect"])) {
                        triggerIncident({
                            type: 'bad_deployment',
                            description: `Critical: Deployment ${latestDeployment.version} failed validation and is causing high error rates.`,
                            severity: 'critical',
                            service: 'API-Gateway'
                        });
                    }
                    // Calculate current targets based on incidents
                    const targets = {
                        ...BASE_METRICS
                    };
                    // Update traffic target based on ddos or organic growth
                    if (activeIncidents.some({
                        "SRESimulator.useEffect": (i)=>i.type === 'ddos_attack'
                    }["SRESimulator.useEffect"])) {
                        targets.traffic = 50000 + Math.random() * 10000;
                    } else if (activeIncidents.some({
                        "SRESimulator.useEffect": (i)=>i.type === 'capacity_exhausted'
                    }["SRESimulator.useEffect"])) {
                        targets.traffic = 5000 + Math.random() * 1000;
                    }
                    // Influence targets based on active incidents
                    activeIncidents.forEach({
                        "SRESimulator.useEffect": (inc)=>{
                            switch(inc.type){
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
                        }
                    }["SRESimulator.useEffect"]);
                    // Gradually move current metrics towards targets with noise
                    const nextMetrics = {
                        cpu: lerp(metrics.cpu, targets.cpu, 0.1) + (Math.random() - 0.5) * 2,
                        memory: lerp(metrics.memory, targets.memory, 0.05) + (Math.random() - 0.5) * 1,
                        disk: lerp(metrics.disk, targets.disk, 0.02) + (Math.random() - 0.5) * 0.5,
                        latency: lerp(metrics.latency, targets.latency, 0.15) + (Math.random() - 0.5) * 10,
                        errorRate: lerp(metrics.errorRate, targets.errorRate, 0.2) + (Math.random() - 0.5) * 0.1,
                        network: lerp(metrics.network, targets.network, 0.1) + (Math.random() - 0.5) * 20,
                        dbConnections: Math.round(lerp(metrics.dbConnections, targets.dbConnections, 0.1)),
                        podCount: Math.round(lerp(metrics.podCount, targets.podCount, 0.05)),
                        traffic: lerp(metrics.traffic, targets.traffic, 0.1) + (Math.random() - 0.5) * 100
                    };
                    // Clamp values
                    nextMetrics.cpu = Math.max(0, Math.min(100, nextMetrics.cpu));
                    nextMetrics.memory = Math.max(0, Math.min(100, nextMetrics.memory));
                    nextMetrics.disk = Math.max(0, Math.min(100, nextMetrics.disk));
                    nextMetrics.errorRate = Math.max(0, Math.min(100, nextMetrics.errorRate));
                    nextMetrics.latency = Math.max(0, nextMetrics.latency);
                    updateMetrics(nextMetrics);
                    // Auto-SRE logic / Random Incident Generator
                    const { maturityLevel, missedCriticalAlerts } = __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"].getState();
                    if (activeIncidents.length < 3 && Math.random() < (autoSreMode ? 0.08 : 0.04)) {
                        const types = [
                            'cpu_spike',
                            'memory_leak',
                            'disk_saturation',
                            'network_loss',
                            'high_latency',
                            'error_rate_surge',
                            'pod_crash',
                            'db_exhaustion',
                            'ddos_attack',
                            'dns_outage'
                        ];
                        // Add noisy alerts for low maturity levels (Alert Fatigue training)
                        if (maturityLevel < 2 && Math.random() < 0.6) {
                            addLog(`NOISE [P3]: Potential jitter in node-${Math.floor(Math.random() * 10)}. No impact detected.`, "warn");
                        }
                        const randomType = types[Math.floor(Math.random() * types.length)];
                        const config = __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INCIDENT_CONFIGS"][randomType];
                        triggerIncident({
                            type: randomType,
                            description: config.description,
                            severity: config.severity,
                            service: config.service
                        });
                        // If many missed alerts, update learning topic to on-call
                        if (missedCriticalAlerts > 2) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"].getState().setLearningTopic('on_call');
                        }
                    }
                }
            }["SRESimulator.useEffect"], 1000);
            return ({
                "SRESimulator.useEffect": ()=>{
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            })["SRESimulator.useEffect"];
        }
    }["SRESimulator.useEffect"], [
        metrics,
        incidents,
        autoSreMode,
        updateMetrics,
        triggerIncident,
        addLog
    ]);
    return null;
}
_s(SRESimulator, "aDwwFOVxU8Sfn6qiB7jV+1WQ07I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = SRESimulator;
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
var _c;
__turbopack_context__.k.register(_c, "SRESimulator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardAction": (()=>CardAction),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MetricCard": (()=>MetricCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Dynamic imports for recharts to avoid SSR/Chunking issues
const ResponsiveContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.ResponsiveContainer), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ResponsiveContainer;
const LineChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.LineChart), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = LineChart;
const Line = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.Line), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c2 = Line;
const YAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.YAxis), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c3 = YAxis;
function MetricCard({ title, value, unit = '', history, dataKey, color = '#3b82f6', status = 'normal' }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MetricCard.useEffect": ()=>{
            setMounted(true);
        }
    }["MetricCard.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2 overflow-hidden relative min-h-[140px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-2 w-2 rounded-full", status === 'normal' && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]", status === 'warning' && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]", status === 'critical' && "bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]")
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-zinc-400 dark:text-zinc-500 font-medium",
                        children: unit
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-12 w-full mt-2 -mx-4 flex-1",
                children: mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveContainer, {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LineChart, {
                        data: history,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(YAxis, {
                                hide: true,
                                domain: [
                                    'auto',
                                    'auto'
                                ]
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Line, {
                                type: "monotone",
                                dataKey: dataKey,
                                stroke: color,
                                strokeWidth: 2,
                                dot: false,
                                isAnimationActive: false
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(MetricCard, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c4 = MetricCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ResponsiveContainer");
__turbopack_context__.k.register(_c1, "LineChart");
__turbopack_context__.k.register(_c2, "Line");
__turbopack_context__.k.register(_c3, "YAxis");
__turbopack_context__.k.register(_c4, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Tooltip": (()=>Tooltip),
    "TooltipContent": (()=>TooltipContent),
    "TooltipProvider": (()=>TooltipProvider),
    "TooltipTrigger": (()=>TooltipTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = TooltipProvider;
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c1 = Tooltip;
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_c2 = TooltipTrigger;
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
                    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c3 = TooltipContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TooltipProvider");
__turbopack_context__.k.register(_c1, "Tooltip");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Slider": (()=>Slider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-slider/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    _s();
    const _values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Slider.useMemo[_values]": ()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
                min,
                max
            ]
    }["Slider.useMemo[_values]"], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Slider, "g0y/PG/feYg861SE8jxuAUMRVc0=");
_c = Slider;
;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BusinessImpactPanel": (()=>BusinessImpactPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function BusinessImpactPanel() {
    _s();
    const { featureVelocity, setFeatureVelocity, userSatisfaction, failedUserActions, loadDelay, infrastructureCost, totalCost, errorBudget, addDecision } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const handleVelocityChange = (val)=>{
        const newVelocity = val[0];
        setFeatureVelocity(newVelocity);
        if (newVelocity > 80) {
            addDecision({
                decision: 'Maximize Feature Velocity',
                reason: 'Business demands rapid delivery of new capabilities',
                outcome: 'Increased market competitiveness but higher risk to reliability',
                impact: 'neutral'
            });
        } else if (newVelocity < 20) {
            addDecision({
                decision: 'Prioritize Reliability',
                reason: 'Stabilizing system after budget depletion',
                outcome: 'Reduced incident rate but slower feature delivery',
                impact: 'positive'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "w-3 h-3 text-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    "Reliability vs Velocity"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-bold border-none", featureVelocity > 70 ? "bg-rose-500 text-white" : featureVelocity < 30 ? "bg-emerald-500 text-black" : "bg-amber-500 text-black"),
                                children: featureVelocity > 70 ? 'Aggressive' : featureVelocity < 30 ? 'Conservative' : 'Balanced'
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-[10px] font-bold uppercase",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-zinc-400 dark:text-zinc-500",
                                                children: "Feature Velocity"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 80,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-zinc-900 dark:text-zinc-300",
                                                children: [
                                                    featureVelocity,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 81,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        value: [
                                            featureVelocity
                                        ],
                                        onValueChange: handleVelocityChange,
                                        max: 100,
                                        step: 5,
                                        className: "py-4"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/50 space-y-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic",
                                    children: '"Moving faster increases the risk of bad deployments and consumes the error budget faster. Pausing releases protects reliability but slows business growth."'
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 mt-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1",
                                                children: "Risk Level"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-1.5 h-1.5 rounded-full", featureVelocity > 60 ? "bg-rose-500" : "bg-emerald-500")
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-zinc-900 dark:text-zinc-100",
                                                        children: featureVelocity > 60 ? 'High' : 'Low'
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1",
                                                children: "Growth Impact"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 107,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3", featureVelocity > 40 ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-500")
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-zinc-900 dark:text-zinc-100",
                                                        children: featureVelocity > 40 ? 'Positive' : 'Slow'
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-3 h-3 text-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    "User Experience Impact"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: Array.from({
                                    length: 5
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-1 h-3 rounded-full", i < Math.floor(userSatisfaction / 20) ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800")
                                    }, i, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1",
                                                children: "Satisfaction"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100",
                                                children: [
                                                    userSatisfaction.toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1",
                                                children: "Sentiment"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[9px] font-bold border-none px-2", userSatisfaction > 90 ? "bg-emerald-500/10 text-emerald-500" : userSatisfaction > 70 ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"),
                                                children: userSatisfaction > 90 ? 'DELIGHTED' : userSatisfaction > 70 ? 'SATISFIED' : 'FRUSTRATED'
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3", failedUserActions > 0 ? "text-rose-500" : "text-zinc-400 dark:text-zinc-500")
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase",
                                                        children: "Failed Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 157,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-bold", failedUserActions > 0 ? "text-rose-500" : "text-zinc-900 dark:text-zinc-200"),
                                                children: failedUserActions
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3", loadDelay > 200 ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500")
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase",
                                                        children: "Perceived Latency"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-bold", loadDelay > 200 ? "text-amber-500" : "text-zinc-900 dark:text-zinc-200"),
                                                children: [
                                                    "+",
                                                    loadDelay.toFixed(0),
                                                    "ms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 171,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-zinc-500 font-medium",
                                    children: "Users care about results, not metrics. 1% error rate means 1 out of 100 users just failed their checkout."
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                        className: "w-3 h-3 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    "FinOps & Cloud Cost"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                className: "text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-none",
                                children: "MONTH-TO-DATE"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1",
                                        children: "Total Burn"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold tracking-tighter text-emerald-600 dark:text-emerald-500",
                                                children: [
                                                    "$",
                                                    totalCost.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-zinc-400 dark:text-zinc-600",
                                                children: "USD"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 202,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-[10px] font-bold uppercase",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-500",
                                                        children: "Infrastructure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-900 dark:text-zinc-300",
                                                        children: [
                                                            "$",
                                                            infrastructureCost.toFixed(3),
                                                            "/s"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full bg-blue-500",
                                                    style: {
                                                        width: `${Math.min(100, infrastructureCost / 0.5 * 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "w-3 h-3 text-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase",
                                                        children: "Cost Efficiency"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight",
                                                children: "Reliability isn't free. Scaling to 99.99% costs 10x more than 99.9%. Are you over-provisioning?"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 225,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-[10px] font-bold text-zinc-500 cursor-help hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                        lineNumber: 235,
                                                        columnNumber: 19
                                                    }, this),
                                                    "View Cost vs SLA Breakdown"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            className: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-[10px] p-2 max-w-[200px] text-zinc-900 dark:text-zinc-100",
                                            children: "Higher reliability requirements demand redundant systems and multi-region failover, which exponentially increase infrastructure costs."
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(BusinessImpactPanel, "P3ltajj1bxn+1MkBNxCawTQ4PzU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = BusinessImpactPanel;
var _c;
__turbopack_context__.k.register(_c, "BusinessImpactPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SystemTopology": (()=>SystemTopology)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/network.js [app-client] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/zap-off.js [app-client] (ecmascript) <export default as ZapOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const SERVICES = [
    {
        id: 'cdn',
        name: 'Global CDN',
        type: 'ingress',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        x: 10,
        y: 50,
        deps: [
            'lb'
        ]
    },
    {
        id: 'lb',
        name: 'Load Balancer',
        type: 'network',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
        x: 25,
        y: 50,
        deps: [
            'api'
        ]
    },
    {
        id: 'api',
        name: 'API Gateway',
        type: 'app',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        x: 45,
        y: 50,
        deps: [
            'auth',
            'order'
        ]
    },
    {
        id: 'auth',
        name: 'Auth Service',
        type: 'app',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"],
        x: 65,
        y: 25,
        deps: [
            'db'
        ]
    },
    {
        id: 'order',
        name: 'Order Service',
        type: 'app',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"],
        x: 65,
        y: 75,
        deps: [
            'db',
            'payment'
        ]
    },
    {
        id: 'db',
        name: 'Main DB',
        type: 'storage',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
        x: 85,
        y: 40,
        deps: []
    },
    {
        id: 'payment',
        name: 'Payment API',
        type: 'external',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        x: 85,
        y: 80,
        deps: []
    }
];
function SystemTopology() {
    _s();
    const { chaosMode, toggleChaosMode, addLog, triggerIncident, incidents, teachingMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const activeIncidentServices = incidents.filter((i)=>i.status !== 'resolved').map((i)=>i.service.toLowerCase());
    const getServiceStatus = (serviceName)=>{
        const isAffected = activeIncidentServices.some((s)=>s.includes(serviceName.toLowerCase()) || serviceName === 'Main DB' && s.includes('db') || serviceName === 'API Gateway' && s.includes('api'));
        return isAffected ? 'error' : 'healthy';
    };
    const injectFailure = (type)=>{
        addLog(`CHAOS: Injecting ${type} into cluster...`, 'warn');
        switch(type){
            case 'latency':
                triggerIncident({
                    type: 'high_latency',
                    severity: 'high',
                    description: 'Simulated network congestion across availability zones',
                    service: 'Load Balancer'
                });
                break;
            case 'crash':
                triggerIncident({
                    type: 'pod_crash',
                    severity: 'critical',
                    description: 'Random pod eviction triggered by chaos engine',
                    service: 'Auth Service'
                });
                break;
            case 'db':
                triggerIncident({
                    type: 'db_exhaustion',
                    severity: 'high',
                    description: 'Connection pool saturation simulation',
                    service: 'Main DB'
                });
                break;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"], {
                                        className: "w-4 h-4 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    "Infrastructure Dependency Graph"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase font-bold tracking-tighter",
                                children: "Real-time Service Health & Blast Radius"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: chaosMode ? "destructive" : "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[9px] font-bold px-2 py-0.5 border-none", chaosMode ? "bg-rose-500 text-white animate-pulse" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"),
                                children: chaosMode ? 'CHAOS ACTIVE' : 'SAFE MODE'
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: chaosMode ? "destructive" : "outline",
                                className: "h-7 text-[10px] font-bold uppercase tracking-widest px-3 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800",
                                onClick: toggleChaosMode,
                                children: chaosMode ? 'Stop Chaos' : 'Enable Chaos'
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-8 relative min-h-[400px] lg:h-[450px] bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 overflow-hidden p-6 flex flex-col group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 opacity-20 pointer-events-none",
                                style: {
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)',
                                    backgroundSize: '32px 32px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute inset-0 w-full h-full pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                            id: "arrow",
                                            viewBox: "0 0 10 10",
                                            refX: "25",
                                            refY: "5",
                                            markerWidth: "4",
                                            markerHeight: "4",
                                            orient: "auto-start-reverse",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 0 0 L 10 5 L 0 10 z",
                                                fill: "currentColor",
                                                className: "text-zinc-300 dark:text-zinc-800"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    SERVICES.map((service)=>service.deps.map((depId)=>{
                                            const dep = SERVICES.find((s)=>s.id === depId);
                                            if (!dep) return null;
                                            const isAffected = getServiceStatus(service.name) !== 'healthy' || getServiceStatus(dep.name) !== 'healthy';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].line, {
                                                x1: `${service.x}%`,
                                                y1: `${service.y}%`,
                                                x2: `${dep.x}%`,
                                                y2: `${dep.y}%`,
                                                stroke: "currentColor",
                                                strokeWidth: isAffected ? 2 : 1,
                                                markerEnd: "url(#arrow)",
                                                initial: {
                                                    pathLength: 0,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    pathLength: 1,
                                                    opacity: isAffected ? 1 : 0.5,
                                                    stroke: isAffected ? '#f43f5e' : '#27272a',
                                                    strokeDasharray: isAffected ? '4 2' : 'none'
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-colors duration-500", isAffected ? "text-rose-500" : "text-zinc-300 dark:text-zinc-800")
                                            }, `${service.id}-${depId}`, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this);
                                        }))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: SERVICES.map((svc, i)=>{
                                    const status = getServiceStatus(svc.name);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        transition: {
                                            delay: i * 0.05
                                        },
                                        style: {
                                            left: `${svc.x}%`,
                                            top: `${svc.y}%`
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -translate-x-1/2 -translate-y-1/2 z-10 w-28 p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all cursor-default bg-white dark:bg-zinc-900", status === 'error' ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] bg-rose-500/5" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1.5 rounded-md", status === 'error' ? "bg-rose-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(svc.icon, {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] font-bold text-zinc-900 dark:text-zinc-200 leading-tight truncate w-full",
                                                        children: svc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[7px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter",
                                                        children: svc.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 182,
                                                columnNumber: 19
                                            }, this),
                                            status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                animate: {
                                                    scale: [
                                                        1,
                                                        1.2,
                                                        1
                                                    ]
                                                },
                                                transition: {
                                                    repeat: Infinity,
                                                    duration: 2
                                                },
                                                className: "absolute -top-1.5 -right-1.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                    className: "w-4 h-4 text-rose-500 fill-white dark:fill-black"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, svc.id, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-4 left-4 flex gap-4 bg-white/80 dark:bg-zinc-950/80 p-2 rounded-lg backdrop-blur-sm border border-zinc-200 dark:border-zinc-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-bold text-zinc-500 uppercase",
                                                children: "Healthy"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-bold text-zinc-500 uppercase",
                                                children: "Incident"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-4 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "w-3 h-3 text-rose-500"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this),
                                            "Chaos Experiments"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChaosButton, {
                                                label: "Inject Latency",
                                                desc: "Add 500ms delay to network",
                                                onClick: ()=>injectFailure('latency'),
                                                disabled: !chaosMode
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChaosButton, {
                                                label: "Kill Auth Pods",
                                                desc: "Simulate service crashing",
                                                onClick: ()=>injectFailure('crash'),
                                                disabled: !chaosMode
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChaosButton, {
                                                label: "Saturate DB",
                                                desc: "Exhaust connection pool",
                                                onClick: ()=>injectFailure('db'),
                                                disabled: !chaosMode
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    !chaosMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 p-3 rounded bg-amber-500/5 border border-amber-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-amber-600 dark:text-amber-500/80 font-medium leading-tight",
                                            children: "Chaos Mode is disabled. Enable it to run reliability experiments."
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2",
                                        children: "Architecture Insights"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center text-[9px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-500",
                                                        children: "Service Count"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: SERVICES.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 254,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center text-[9px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-500",
                                                        children: "Edge Node"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-emerald-500 uppercase",
                                                        children: "CDN (v1.2)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 258,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center text-[9px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-500",
                                                        children: "DB Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold uppercase", getServiceStatus('Main DB') === 'healthy' ? "text-emerald-500" : "text-rose-500"),
                                                        children: getServiceStatus('Main DB').toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            teachingMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2",
                                        children: "SRE Pro Tip"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed",
                                        children: [
                                            "Visualizing dependencies helps identify the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Blast Radius"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                                lineNumber: 275,
                                                columnNumber: 61
                                            }, this),
                                            " of an outage. If the DB fails, every service above it in the graph will eventually break."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(SystemTopology, "3OGQR96YP/kLOvhtADEeqXGPpx4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = SystemTopology;
function ChaosButton({ label, desc, onClick, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full text-left p-3 rounded-lg border transition-all group", disabled ? "bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-rose-500/5"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors uppercase tracking-wider",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[9px] text-zinc-500 mt-0.5",
                            children: desc
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__["ZapOff"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3 transition-colors", disabled ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-400 dark:text-zinc-600 group-hover:text-rose-500")
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
            lineNumber: 297,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
_c1 = ChaosButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "SystemTopology");
__turbopack_context__.k.register(_c1, "ChaosButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RealTimeDashboard": (()=>RealTimeDashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/metric-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$business$2d$impact$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/business-impact-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$system$2d$topology$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/system-topology.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
// Dynamic imports for recharts to avoid SSR/Chunking issues
const ResponsiveContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.ResponsiveContainer), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ResponsiveContainer;
const AreaChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.AreaChart), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = AreaChart;
const Area = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.Area), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c2 = Area;
const XAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.XAxis), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c3 = XAxis;
const YAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.YAxis), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c4 = YAxis;
const Tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.Tooltip), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c5 = Tooltip;
const CartesianGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i).then((mod)=>mod.CartesianGrid), {
    loadableGenerated: {
        modules: [
            "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/recharts/es6/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c6 = CartesianGrid;
function RealTimeDashboard() {
    _s();
    const { metrics, history, teachingMode, errorBudget, toilTime, totalCost, automationSavings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RealTimeDashboard.useEffect": ()=>{
            setMounted(true);
        }
    }["RealTimeDashboard.useEffect"], []);
    const getStatus = (val, warn, crit)=>{
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
    const { missedCriticalAlerts, alertNoiseLevel, onCallShiftActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-96 w-full bg-zinc-100 dark:bg-zinc-900/20 animate-pulse rounded-lg"
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
        lineNumber: 58,
        columnNumber: 24
    }, this);
    const isDark = theme === 'dark';
    const gridColor = isDark ? '#27272a' : '#e4e4e7';
    const axisColor = isDark ? '#52525b' : '#a1a1aa';
    const tooltipBg = isDark ? '#18181b' : '#ffffff';
    const tooltipBorder = isDark ? '#27272a' : '#e4e4e7';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", onCallShiftActive ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-1.5 h-1.5 rounded-full", onCallShiftActive ? "bg-amber-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600")
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            "On-Call Shift: ",
                            onCallShiftActive ? 'Active' : 'Standby'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    missedCriticalAlerts > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-bounce",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            "Alert Fatigue: ",
                            missedCriticalAlerts,
                            " Critical Missed"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4",
                    children: [
                        {
                            key: 'cpu',
                            title: 'CPU Usage',
                            unit: '%',
                            color: '#10b981',
                            warn: 70,
                            crit: 90
                        },
                        {
                            key: 'memory',
                            title: 'Memory',
                            unit: '%',
                            color: '#3b82f6',
                            warn: 75,
                            crit: 90
                        },
                        {
                            key: 'latency',
                            title: 'Latency',
                            unit: 'ms',
                            color: '#f59e0b',
                            warn: 500,
                            crit: 1000
                        },
                        {
                            key: 'errorRate',
                            title: 'Error Rate',
                            unit: '%',
                            color: '#ef4444',
                            warn: 1,
                            crit: 5
                        },
                        {
                            key: 'traffic',
                            title: 'Traffic',
                            unit: 'rps',
                            color: '#8b5cf6',
                            warn: 5000,
                            crit: 10000
                        },
                        {
                            key: 'budget',
                            title: 'Error Budget',
                            unit: '%',
                            color: '#ec4899',
                            warn: 20,
                            crit: 5
                        },
                        {
                            key: 'toil',
                            title: 'Toil Time',
                            unit: 's',
                            color: '#71717a',
                            warn: 300,
                            crit: 600
                        },
                        {
                            key: 'cost',
                            title: 'Total Cost',
                            unit: '$',
                            color: '#facc15',
                            warn: 1000,
                            crit: 5000
                        }
                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$metric$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCard"], {
                                    title: m.title,
                                    value: m.key === 'budget' ? errorBudget.toFixed(2) : m.key === 'toil' ? toilTime.toString() : m.key === 'cost' ? totalCost.toFixed(0) : m.key === 'latency' || m.key === 'traffic' ? Math.round(metrics[m.key]) : metrics[m.key].toFixed(m.key === 'errorRate' ? 2 : 1),
                                    unit: m.unit,
                                    history: history,
                                    dataKey: m.key === 'budget' ? 'errorBudget' : m.key,
                                    color: m.color,
                                    status: m.key === 'budget' ? getStatus(100 - errorBudget, 80, 95) : m.key === 'cost' ? getStatus(totalCost, 5000, 10000) : m.key === 'toil' ? getStatus(toilTime, 300, 600) : getStatus(metrics[m.key], m.warn, m.crit)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                teachingMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "absolute top-3 right-3 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            className: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 max-w-[180px] text-[10px] leading-tight p-2 text-zinc-900 dark:text-zinc-100",
                                            children: METRIC_INFO[m.key]
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, m.key, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$business$2d$impact$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BusinessImpactPanel"], {}, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$system$2d$topology$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemTopology"], {}, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 lg:col-span-8 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2 uppercase tracking-widest",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            "Reliability & Budget Consumption"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold",
                                                    children: "Automation Savings"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-emerald-600 dark:text-emerald-500",
                                                    children: [
                                                        "+",
                                                        automationSavings.toFixed(1),
                                                        "h"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-64 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveContainer, {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AreaChart, {
                                        data: history,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "colorBudget",
                                                    x1: "0",
                                                    y1: "0",
                                                    x2: "0",
                                                    y2: "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "5%",
                                                            stopColor: "#ec4899",
                                                            stopOpacity: 0.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "95%",
                                                            stopColor: "#ec4899",
                                                            stopOpacity: 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartesianGrid, {
                                                strokeDasharray: "3 3",
                                                stroke: gridColor,
                                                vertical: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XAxis, {
                                                hide: true
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(YAxis, {
                                                domain: [
                                                    0,
                                                    100
                                                ],
                                                stroke: axisColor,
                                                fontSize: 10,
                                                tickLine: false,
                                                axisLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 163,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                contentStyle: {
                                                    backgroundColor: tooltipBg,
                                                    border: `1px solid ${tooltipBorder}`,
                                                    borderRadius: '8px'
                                                },
                                                itemStyle: {
                                                    fontSize: '12px',
                                                    color: isDark ? '#f4f4f5' : '#18181b'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Area, {
                                                type: "monotone",
                                                dataKey: "errorBudget",
                                                stroke: "#ec4899",
                                                fillOpacity: 1,
                                                fill: "url(#colorBudget)",
                                                isAnimationActive: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 lg:col-span-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2 uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 w-1.5 rounded-full bg-rose-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this),
                                    "Error Rate (SLI)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-64 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveContainer, {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AreaChart, {
                                        data: history,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "colorErr",
                                                    x1: "0",
                                                    y1: "0",
                                                    x2: "0",
                                                    y2: "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "5%",
                                                            stopColor: "#ef4444",
                                                            stopOpacity: 0.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "95%",
                                                            stopColor: "#ef4444",
                                                            stopOpacity: 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartesianGrid, {
                                                strokeDasharray: "3 3",
                                                stroke: gridColor,
                                                vertical: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XAxis, {
                                                hide: true
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(YAxis, {
                                                stroke: axisColor,
                                                fontSize: 10,
                                                tickLine: false,
                                                axisLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                contentStyle: {
                                                    backgroundColor: tooltipBg,
                                                    border: `1px solid ${tooltipBorder}`,
                                                    borderRadius: '8px'
                                                },
                                                itemStyle: {
                                                    fontSize: '12px',
                                                    color: isDark ? '#f4f4f5' : '#18181b'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Area, {
                                                type: "monotone",
                                                dataKey: "errorRate",
                                                stroke: "#ef4444",
                                                fillOpacity: 1,
                                                fill: "url(#colorErr)",
                                                isAnimationActive: false
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(RealTimeDashboard, "d1BI8InEvq/92/5YaEq/ZvPnchc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c7 = RealTimeDashboard;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "ResponsiveContainer");
__turbopack_context__.k.register(_c1, "AreaChart");
__turbopack_context__.k.register(_c2, "Area");
__turbopack_context__.k.register(_c3, "XAxis");
__turbopack_context__.k.register(_c4, "YAxis");
__turbopack_context__.k.register(_c5, "Tooltip");
__turbopack_context__.k.register(_c6, "CartesianGrid");
__turbopack_context__.k.register(_c7, "RealTimeDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/switch.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Switch": (()=>Switch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Switch({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "switch",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
            "data-slot": "switch-thumb",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/switch.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/switch.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Switch;
;
var _c;
__turbopack_context__.k.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/label.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Label)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "IncidentControlPanel": (()=>IncidentControlPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function IncidentControlPanel() {
    _s();
    const { triggerIncident, autoSreMode, toggleAutoSre, incidents, performDeployment, scaleService, toilCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const activeCount = incidents.filter((i)=>i.status !== 'resolved').length;
    const handleTrigger = (type)=>{
        const config = __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INCIDENT_CONFIGS"][type];
        triggerIncident({
            type,
            description: config.description,
            severity: config.severity,
            service: config.service
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-emerald-500/10 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                            className: "w-5 h-5 text-emerald-500"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest",
                                                children: "Chaos Training Lab"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-zinc-500 dark:text-zinc-400",
                                                children: "Pick an incident type to see how the system reacts"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6 px-4 py-2 bg-zinc-100 dark:bg-zinc-800/30 rounded-full border border-zinc-200 dark:border-zinc-800 self-stretch md:self-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-2 w-2 rounded-full", autoSreMode ? "bg-emerald-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600")
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "auto-sre",
                                                className: "text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400",
                                                children: "Auto-SRE Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                id: "auto-sre",
                                                checked: autoSreMode,
                                                onCheckedChange: toggleAutoSre,
                                                className: "scale-75"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block w-px h-4 bg-zinc-200 dark:bg-zinc-700"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                className: "w-3 h-3 text-zinc-400 dark:text-zinc-500"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400",
                                                children: [
                                                    "Status: ",
                                                    activeCount > 0 ? 'Learning Active' : 'Waiting'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 76,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3",
                            children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INCIDENT_CONFIGS"]).map((type)=>{
                                const config = __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INCIDENT_CONFIGS"][type];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: ()=>handleTrigger(type),
                                                className: "bg-zinc-50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/50 group h-20 flex flex-col items-center justify-center gap-1.5 transition-all relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        className: "w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 text-center leading-tight px-2 uppercase tracking-tighter",
                                                        children: type.replace(/_/g, ' ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 88,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            className: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 max-w-[200px] p-3 text-zinc-900 dark:text-zinc-100 shadow-xl",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] leading-relaxed",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-emerald-600 dark:text-emerald-400 block mb-1",
                                                        children: "Beginner Concept:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 23
                                                    }, this),
                                                    config.beginnerDescription
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, type, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4",
                                children: "Change Management Training"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold h-12 flex flex-col items-center justify-center gap-0.5",
                                        onClick: ()=>performDeployment('normal'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Normal Deploy"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-normal opacity-70",
                                                children: "30% Risk of Failure"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 flex flex-col items-center justify-center gap-0.5 text-zinc-900 dark:text-zinc-100",
                                        onClick: ()=>performDeployment('canary'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Canary Deploy"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-normal opacity-70",
                                                children: "Safe & Gradual"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-zinc-500 dark:text-zinc-500 mt-3 italic",
                                children: '"70% of outages are caused by changes." Try a Normal Deploy and see if it breaks the system!'
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4",
                                children: "Capacity Planning & Toil"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 text-zinc-900 dark:text-zinc-100",
                                        onClick: ()=>scaleService(1),
                                        children: "Scale Up (+1 Pod)"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "flex-1 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold h-12 text-zinc-900 dark:text-zinc-100",
                                        onClick: ()=>scaleService(-1),
                                        children: "Scale Down (-1 Pod)"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center justify-between text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-500 dark:text-zinc-500",
                                        children: "Toil Tracking:"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-emerald-600 dark:text-emerald-500",
                                        children: [
                                            toilCount,
                                            " Manual Actions"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-emerald-500 transition-all",
                                    style: {
                                        width: `${toilCount % 10 * 10}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(IncidentControlPanel, "5wMXHd+/QNc7DyPS+Umr/oOrvuk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = IncidentControlPanel;
var _c;
__turbopack_context__.k.register(_c, "IncidentControlPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlertList": (()=>AlertList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function AlertList({ onSelect }) {
    _s();
    const { incidents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const activeIncidents = incidents.filter((i)=>i.status !== 'resolved');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-4 h-full flex flex-col shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4 px-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                            className: "w-4 h-4 text-rose-500"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        "Active Incidents (",
                        activeIncidents.length,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar",
                children: activeIncidents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 space-y-2 py-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-8 h-8 opacity-20"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] uppercase font-bold tracking-tighter",
                            children: "System Nominal"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this) : activeIncidents.map((inc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-3 rounded-lg border transition-all cursor-pointer group", inc.severity === 'critical' ? "border-rose-500/30 bg-rose-500/5" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"),
                        onClick: ()=>onSelect(inc.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[9px] uppercase font-bold px-1.5 py-0", inc.severity === 'critical' && "bg-rose-500 text-white", inc.severity === 'high' && "bg-amber-500 text-black", inc.severity === 'medium' && "bg-blue-500 text-white", inc.severity === 'low' && "bg-zinc-500 text-white"),
                                        children: inc.severity
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 text-zinc-400 dark:text-zinc-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                                lineNumber: 51,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px]",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(inc.startTime),
                                                    " ago"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                                lineNumber: 52,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                        lineNumber: 50,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[11px] font-bold text-zinc-900 dark:text-zinc-200 leading-tight mb-1 group-hover:text-rose-500 transition-colors",
                                children: inc.description
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-zinc-500 dark:text-zinc-500 font-mono mb-3",
                                children: [
                                    "Service: ",
                                    inc.service
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                size: "sm",
                                className: "w-full h-7 text-[10px] uppercase font-bold gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    "Root Cause Analysis"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)
                        ]
                    }, inc.id, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(AlertList, "iVkjEBHrrETJkne/IS7Jk8R3sMI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = AlertList;
var _c;
__turbopack_context__.k.register(_c, "AlertList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RCAPanel": (()=>RCAPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/brain-circuit.js [app-client] (ecmascript) <export default as BrainCircuit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function RCAPanel({ incidentId, onClose }) {
    _s();
    const { incidents, resolveIncident, setIncidentStatus, addLog, teachingMode, setLearningTopic } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const [analyzing, setAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const incident = incidents.find((i)=>i.id === incidentId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RCAPanel.useEffect": ()=>{
            if (incident && !incident.rca && incident.status !== 'resolved') {
                setAnalyzing(true);
                const timer = setTimeout({
                    "RCAPanel.useEffect.timer": ()=>{
                        setAnalyzing(false);
                        if (teachingMode) setLearningTopic('rca');
                    }
                }["RCAPanel.useEffect.timer"], 2000);
                return ({
                    "RCAPanel.useEffect": ()=>clearTimeout(timer)
                })["RCAPanel.useEffect"];
            }
        }
    }["RCAPanel.useEffect"], [
        incidentId,
        incident?.id,
        teachingMode,
        setLearningTopic
    ]);
    if (!incident) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center text-center space-y-4 h-full shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                        className: "w-12 h-12 text-zinc-400 dark:text-zinc-600"
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-xs",
                            children: "AI Analysis Engine"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-400 dark:text-zinc-600 text-[10px] max-w-[200px] mt-2 italic",
                            children: "Select an active incident from the list to begin deep metric correlation and root cause discovery."
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    const rca = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRCA"])(incident.type);
    const remediation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRemediation"])(incident.type);
    const handleResolve = ()=>{
        setIncidentStatus(incident.id, 'remediating');
        addLog(`System performing auto-remediation: ${remediation.action}`, 'info');
        if (teachingMode) setLearningTopic('remediation');
        setTimeout(()=>{
            resolveIncident(incident.id);
        }, 3000);
    };
    if (incident.status === 'resolved') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-white dark:bg-zinc-900/50 border-emerald-500/20 p-8 flex flex-col h-full overflow-y-auto custom-scrollbar shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-emerald-500/10 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-5 h-5 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest",
                                            children: "Blameless Postmortem"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-emerald-600 dark:text-emerald-500 font-mono",
                                            children: "Status: RESOLVED & ARCHIVED"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: onClose,
                            className: "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        " Summary of Events"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed",
                                        children: [
                                            "The system experienced a ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-600 dark:text-emerald-400 font-bold",
                                                children: incident.type.replace(/_/g, ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                lineNumber: 78,
                                                columnNumber: 42
                                            }, this),
                                            " event in the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-zinc-900 dark:text-zinc-100",
                                                children: incident.service
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                lineNumber: 78,
                                                columnNumber: 164
                                            }, this),
                                            " component. Detection was triggered by automated SLI monitoring when thresholds were breached."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4",
                                            children: "Root Cause (Systemic)"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-l-2 border-emerald-500/50 pl-4 italic",
                                            children: [
                                                '"',
                                                rca?.explanation,
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4",
                                            children: "Action Items (Preventative)"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "text-[11px] text-zinc-500 dark:text-zinc-400 flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Automate threshold alerts for ",
                                                        incident.type
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "text-[11px] text-zinc-500 dark:text-zinc-400 flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Review capacity limits for ",
                                                        incident.service
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold uppercase tracking-widest",
                                            children: "SRE Learning: Blamelessness"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight",
                                    children: [
                                        "This postmortem focused on ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-600 dark:text-emerald-500 font-bold",
                                            children: "systemic failure"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 112,
                                            columnNumber: 42
                                        }, this),
                                        " rather than human error. In a blameless culture, we assume engineers act in good faith and that failures are the result of poor tooling or brittle processes."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end pt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: onClose,
                                variant: "outline",
                                className: "text-[10px] font-bold uppercase h-8 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
                                children: "Acknowledge & Close"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full relative overflow-y-auto custom-scrollbar shadow-sm",
        children: analyzing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                            className: "w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest animate-pulse",
                            children: "Correlating Metrics..."
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-zinc-500 mt-2 font-mono",
                            children: [
                                "Analyzing ",
                                incident.service,
                                " logs & throughput"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
            lineNumber: 130,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-blue-500/10 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                                        className: "w-5 h-5 text-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest",
                                            children: "Root Cause Analysis"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-zinc-500",
                                            children: [
                                                "Incident ID: ",
                                                incident.id
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: onClose,
                            className: "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        " Probable Cause"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "outline",
                                    className: "text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
                                    children: [
                                        Math.round((rca?.confidence || 0) * 100),
                                        "% Confidence"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2",
                            children: rca?.cause
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-700 pl-3 mb-4",
                            children: [
                                '"',
                                rca?.explanation,
                                '"'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this),
                        teachingMode && rca?.learningSteps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-500/5 border border-blue-500/10 rounded p-3 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 173,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold uppercase tracking-widest",
                                            children: "Learning Guide"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: rca.learningSteps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-blue-500/50 mt-0.5",
                                                    children: [
                                                        "0",
                                                        step.step
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-bold text-zinc-700 dark:text-zinc-200",
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-zinc-500 dark:text-zinc-500 leading-tight",
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, step.step, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 178,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 171,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                    className: "w-4 h-4 text-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-bold text-zinc-500 dark:text-zinc-300 uppercase tracking-widest",
                                    children: "Remediation Steps"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: remediation?.steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[9px] font-bold shrink-0",
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this),
                                        step
                                    ]
                                }, i, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this),
                        teachingMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-emerald-500/5 border border-emerald-500/10 rounded p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold uppercase tracking-widest",
                                            children: "Why this fix?"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight",
                                    children: remediation?.learningExplanation
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                            lineNumber: 208,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 191,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[10px] gap-2 h-10",
                        onClick: handleResolve,
                        disabled: incident.status === 'remediating',
                        children: incident.status === 'remediating' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 228,
                                    columnNumber: 19
                                }, this),
                                "Applying ",
                                remediation?.action,
                                "..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                                    lineNumber: 233,
                                    columnNumber: 19
                                }, this),
                                "Execute: ",
                                remediation?.action
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                        lineNumber: 221,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
            lineNumber: 142,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(RCAPanel, "l3e+VM9JjeSQyaP1TG00mlC1Z8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = RCAPanel;
var _c;
__turbopack_context__.k.register(_c, "RCAPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LogTerminal": (()=>LogTerminal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$command$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Command$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/command.js [app-client] (ecmascript) <export default as Command>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LogTerminal() {
    _s();
    const { logs, metrics, incidents, resolveIncident, addLog, onCommand } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const [command, setCommand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [terminalHistory, setTerminalHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LogTerminal.useEffect": ()=>{
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }
    }["LogTerminal.useEffect"], [
        logs,
        terminalHistory
    ]);
    const handleCommand = (e)=>{
        e.preventDefault();
        if (!command.trim()) return;
        const cmd = command.trim().toLowerCase();
        const newEntry = {
            type: 'cmd',
            text: command,
            timestamp: Date.now()
        };
        setTerminalHistory((prev)=>[
                ...prev,
                newEntry
            ]);
        setCommand('');
        onCommand(cmd);
        // Simulate command processing
        setTimeout(()=>{
            let response = '';
            if (cmd === 'help') {
                response = 'Available commands: kubectl, top, df -h, curl, dig, clear, help';
            } else if (cmd.startsWith('kubectl get pods')) {
                const pods = Array.from({
                    length: metrics.podCount
                }).map((_, i)=>`api-gateway-${Math.random().toString(36).substring(7)}   1/1   Running   0   ${Math.floor(Math.random() * 10)}h`).join('\n');
                response = `NAME                               READY   STATUS    RESTARTS   AGE\n${pods}`;
            } else if (cmd === 'top') {
                response = `CPU Usage: ${metrics.cpu.toFixed(1)}%\nMemory Usage: ${metrics.memory.toFixed(1)}%\nLoad Average: 0.85 0.92 1.05`;
            } else if (cmd === 'df -h') {
                response = `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   ${metrics.disk.toFixed(0)}G   ${(50 - metrics.disk).toFixed(0)}G  ${metrics.disk.toFixed(0)}% /`;
            } else if (cmd.startsWith('curl')) {
                const isError = metrics.errorRate > 10;
                response = isError ? 'HTTP/1.1 500 Internal Server Error\n{"error": "Service Unavailable"}' : 'HTTP/1.1 200 OK\n{"status": "healthy"}';
            } else if (cmd === 'clear') {
                setTerminalHistory([]);
                return;
            } else if (cmd.startsWith('kubectl delete pod')) {
                response = 'pod "api-gateway-xxxxx" deleted';
                addLog('Manual pod deletion triggered via terminal', 'warn');
            } else if (cmd === 'dig') {
                response = 'api.srepractice.io.  300  IN  A  1.2.3.4';
            } else {
                response = `command not found: ${cmd}`;
            }
            setTerminalHistory((prev)=>[
                    ...prev,
                    {
                        type: 'resp',
                        text: response,
                        timestamp: Date.now()
                    }
                ]);
        }, 200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex flex-col h-full font-mono shadow-sm group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                className: "w-3 h-3 text-zinc-500 dark:text-zinc-500"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-zinc-600 dark:text-zinc-400 uppercase font-bold tracking-widest",
                                children: "Interactive SRE Terminal"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "flex-1 overflow-y-auto p-4 space-y-2 text-[11px] custom-scrollbar bg-black",
                onClick: ()=>inputRef.current?.focus(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-zinc-700 italic mb-4 border-b border-zinc-900 pb-2",
                            children: "System initialized. Type 'help' for commands."
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        [
                            ...logs.map((l)=>({
                                    ...l,
                                    isLog: true
                                })),
                            ...terminalHistory.map((h)=>({
                                    ...h,
                                    isLog: false
                                }))
                        ].sort((a, b)=>a.timestamp - b.timestamp).slice(-100).map((item, i)=>{
                            if ('isLog' in item && item.isLog) {
                                const log = item;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 leading-relaxed opacity-70 hover:opacity-100 transition-opacity",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-600 shrink-0",
                                            children: [
                                                "[",
                                                new Date(log.timestamp).toLocaleTimeString(),
                                                "]"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                            lineNumber: 98,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5", log.type === 'error' && "text-rose-500", log.type === 'warn' && "text-amber-500", log.type === 'success' && "text-emerald-500", log.type === 'info' && "text-blue-500"),
                                            children: [
                                                log.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 48
                                                }, this),
                                                log.type === 'warn' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 47
                                                }, this),
                                                log.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 50
                                                }, this),
                                                log.type === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 47
                                                }, this),
                                                log.message
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, `log-${i}`, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 19
                                }, this);
                            } else {
                                const entry = item;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: entry.type === 'cmd' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-emerald-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                lineNumber: 120,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: entry.text
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                                lineNumber: 121,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                        lineNumber: 119,
                                        columnNumber: 23
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-zinc-300 pl-5 whitespace-pre-wrap leading-tight font-mono",
                                        children: entry.text
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                        lineNumber: 124,
                                        columnNumber: 23
                                    }, this)
                                }, `cmd-${i}`, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 19
                                }, this);
                            }
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleCommand,
                className: "p-2 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-emerald-500 font-bold ml-2 shrink-0 text-xs",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: command,
                        onChange: (e)=>setCommand(e.target.value),
                        placeholder: "Enter SRE command...",
                        className: "bg-transparent border-none outline-none text-zinc-200 text-xs font-mono w-full placeholder:text-zinc-700",
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$command$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Command$3e$__["Command"], {
                        className: "w-3 h-3 text-zinc-700 mr-2"
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(LogTerminal, "79r83A64Rsc0KYsY+acL1Qcz4ek=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = LogTerminal;
var _c;
__turbopack_context__.k.register(_c, "LogTerminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeToggle": (()=>ThemeToggle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ThemeToggle() {
    _s();
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeToggle.useEffect"], []);
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-9 h-9"
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
        lineNumber: 17,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>setTheme(theme === 'dark' ? 'light' : 'dark'),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300", "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800", "hover:ring-2 hover:ring-emerald-500/20 hover:border-emerald-500/50", "group overflow-hidden"),
        "aria-label": "Toggle theme",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                initial: false,
                children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        y: 20,
                        opacity: 0,
                        rotate: 45
                    },
                    animate: {
                        y: 0,
                        opacity: 1,
                        rotate: 0
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        rotate: -45
                    },
                    transition: {
                        duration: 0.2,
                        ease: "easeOut"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                        className: "w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                }, "moon", false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        y: 20,
                        opacity: 0,
                        rotate: 45
                    },
                    animate: {
                        y: 0,
                        opacity: 1,
                        rotate: 0
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        rotate: -45
                    },
                    transition: {
                        duration: 0.2,
                        ease: "easeOut"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                        className: "w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this)
                }, "sun", false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "uGU5l7ciDSfqFDe6wS7vfMb29jQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SRELearningHub": (()=>SRELearningHub)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/brain-circuit.js [app-client] (ecmascript) <export default as BrainCircuit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const PLAYBOOKS = [
    {
        id: 'cpu-spike',
        title: 'High CPU Response',
        steps: [
            {
                text: 'Analyze system load',
                cmd: 'top'
            },
            {
                text: 'Check pod distribution',
                cmd: 'kubectl get pods'
            },
            {
                text: 'Scale up replicas',
                cmd: 'kubectl scale'
            },
            {
                text: 'Verify stability',
                cmd: 'curl'
            }
        ]
    },
    {
        id: 'memory-leak',
        title: 'Memory Leak Investigation',
        steps: [
            {
                text: 'Check memory usage',
                cmd: 'top'
            },
            {
                text: 'Identify leaking pods',
                cmd: 'kubectl get pods'
            },
            {
                text: 'Restart service',
                cmd: 'kubectl delete pod'
            },
            {
                text: 'Verify health',
                cmd: 'curl'
            }
        ]
    },
    {
        id: 'db-saturation',
        title: 'DB Connection Exhaustion',
        steps: [
            {
                text: 'Check DB connections',
                cmd: 'top'
            },
            {
                text: 'Identify app traffic',
                cmd: 'curl'
            },
            {
                text: 'Scale up workers',
                cmd: 'kubectl scale'
            },
            {
                text: 'Verify DB health',
                cmd: 'dig'
            }
        ]
    }
];
function SRELearningHub() {
    _s();
    const { checkpoints, completeCheckpoint, decisionLog, activePlaybook, setActivePlaybook, playbookProgress, commandsExecuted, addLog, reliabilityScore, maturityLevel, experience } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const [selectedCheckpoint, setSelectedCheckpoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAnswer, setSelectedAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showFeedback, setShowFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInterview, setShowInterview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const INTERVIEW_QUESTIONS = [
        {
            q: "How do you define an SLA vs an SLO?",
            a: "An SLO is an internal target, while an SLA is a legal agreement with customers including consequences for missing targets."
        },
        {
            q: "What is Error Budget and how do you use it?",
            a: "It's the amount of unreliability allowed (1 - SLO). When exhausted, we prioritize stability over new features."
        },
        {
            q: "Explain 'Toil' in the context of SRE.",
            a: "Toil is manual, repetitive work that scales with the size of the system and lacks enduring value."
        }
    ];
    const MATURITY_STEPS = [
        {
            level: 0,
            title: 'Manual Ops',
            desc: 'Reacting to fires manually'
        },
        {
            level: 1,
            title: 'Apprentice',
            desc: 'Beginning to use monitoring'
        },
        {
            level: 2,
            title: 'Specialist',
            desc: 'Using Error Budgets effectively'
        },
        {
            level: 3,
            title: 'Automated',
            desc: 'Implementing self-healing systems'
        },
        {
            level: 4,
            title: 'Architect',
            desc: 'Designing for resilience first'
        }
    ];
    const handleCheckpointClick = (cp)=>{
        if (cp.completed) return;
        setSelectedCheckpoint(cp);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };
    const submitAnswer = ()=>{
        if (selectedCheckpoint && selectedAnswer !== null) {
            setShowFeedback(true);
            if (selectedAnswer === selectedCheckpoint.correctAnswer) {
                completeCheckpoint(selectedCheckpoint.id);
                addLog(`CHECKPOINT: Passed "${selectedCheckpoint.title}" assessment.`, 'success');
            }
        }
    };
    const currentPlaybook = PLAYBOOKS.find((p)=>p.id === activePlaybook);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "w-4 h-4 text-emerald-500"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, this),
                                            "Knowledge Checkpoints"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "text-[10px] font-bold text-zinc-500 uppercase border-zinc-200 dark:border-zinc-800",
                                        children: [
                                            checkpoints.filter((c)=>c.completed).length,
                                            "/",
                                            checkpoints.length,
                                            " COMPLETED"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: checkpoints.map((cp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleCheckpointClick(cp),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between p-3 rounded-lg border transition-all group", cp.completed ? "bg-emerald-500/5 border-emerald-500/20 opacity-80" : "bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    cp.completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-4 h-4 text-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                        className: "w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-bold", cp.completed ? "text-emerald-600 dark:text-emerald-500" : "text-zinc-700 dark:text-zinc-300"),
                                                                children: cp.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] text-zinc-500 uppercase font-bold tracking-wider",
                                                                children: cp.concept
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 147,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 139,
                                                columnNumber: 17
                                            }, this),
                                            !cp.completed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-3 h-3 text-zinc-400 dark:text-zinc-600"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 150,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, cp.id, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: selectedCheckpoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "max-w-md w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2",
                                                children: selectedCheckpoint.title
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-zinc-500 dark:text-zinc-400 mb-6",
                                                children: selectedCheckpoint.question
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 mb-8",
                                                children: selectedCheckpoint.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>!showFeedback && setSelectedAnswer(i),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full text-left p-4 rounded-xl border text-sm transition-all", selectedAnswer === i ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400" : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400", showFeedback && i === selectedCheckpoint.correctAnswer && "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400", showFeedback && selectedAnswer === i && i !== selectedCheckpoint.correctAnswer && "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400"),
                                                        children: opt
                                                    }, i, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this),
                                            showFeedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-4 rounded-xl mb-6 text-xs font-medium leading-relaxed", selectedAnswer === selectedCheckpoint.correctAnswer ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"),
                                                children: [
                                                    selectedAnswer === selectedCheckpoint.correctAnswer ? 'Correct! ' : 'Incorrect. ',
                                                    selectedCheckpoint.explanation
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: !showFeedback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            className: "flex-1 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
                                                            onClick: ()=>setSelectedCheckpoint(null),
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            className: "flex-1 bg-emerald-600 hover:bg-emerald-500 text-white",
                                                            disabled: selectedAnswer === null,
                                                            onClick: submitAnswer,
                                                            children: "Submit Answer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-none",
                                                    onClick: ()=>setSelectedCheckpoint(null),
                                                    children: "Close"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                className: "w-4 h-4 text-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this),
                                            "Interactive Playbooks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    activePlaybook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: "bg-blue-500 text-white border-none animate-pulse",
                                        children: [
                                            playbookProgress,
                                            "% COMPLETE"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 flex-1",
                                children: !activePlaybook ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-2",
                                    children: PLAYBOOKS.map((pb)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePlaybook(pb.id),
                                            className: "w-full flex items-center justify-between p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/5 group transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400",
                                                            children: pb.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] text-zinc-500 uppercase font-bold mt-1",
                                                            children: "Manual Terminal Training"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 255,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-3 h-3 text-zinc-400 dark:text-zinc-700 group-hover:text-blue-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, pb.id, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 248,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 246,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-blue-500/20 p-6 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest",
                                                            children: "Active Training"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "xs",
                                                            onClick: ()=>setActivePlaybook(null),
                                                            className: "h-5 text-[9px] text-zinc-500",
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-bold text-zinc-900 dark:text-zinc-200",
                                                    children: currentPlaybook?.title
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: currentPlaybook?.steps.map((step, i)=>{
                                                const isCompleted = (i + 1) * 25 <= playbookProgress;
                                                const isCurrent = i * 25 < playbookProgress && (i + 1) * 25 > playbookProgress;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-start gap-3 p-3 rounded-lg border transition-all", isCompleted ? "bg-emerald-500/5 border-emerald-500/20 opacity-60" : isCurrent ? "bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/20" : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-40"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5", isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "border-zinc-300 dark:border-zinc-700 text-zinc-500"),
                                                            children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 42
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold",
                                                                children: i + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 81
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-bold", isCompleted ? "text-emerald-600 dark:text-emerald-500" : "text-zinc-700 dark:text-zinc-200"),
                                                                    children: step.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                    lineNumber: 292,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mt-1.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                                                            className: "w-3 h-3 text-zinc-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                            lineNumber: 294,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "text-[9px] bg-black text-emerald-400 px-1.5 py-0.5 rounded border border-zinc-800",
                                                                            children: step.cmd
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                            lineNumber: 295,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                    lineNumber: 293,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 border-t border-zinc-200 dark:border-zinc-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-zinc-500 mb-4 text-center italic",
                                                    children: "Run the commands in the System Logs terminal to progress."
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-10 text-xs font-bold uppercase tracking-widest transition-all", playbookProgress >= 100 ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border-none"),
                                                    disabled: playbookProgress < 100,
                                                    onClick: ()=>{
                                                        addLog(`PLAYBOOK: Mastered "${currentPlaybook?.title}" response.`, 'success');
                                                        setActivePlaybook(null);
                                                    },
                                                    children: playbookProgress >= 100 ? 'Claim 50 XP' : 'In Progress...'
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-8 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                        className: "w-4 h-4 text-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 17
                                                    }, this),
                                                    "SRE Maturity & Reliability Score"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 332,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase font-bold",
                                                children: "Career Progression Tracking"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 336,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] font-bold text-zinc-500 uppercase",
                                                            children: "Experience"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 20
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold tracking-tighter text-blue-500",
                                                            children: [
                                                                experience,
                                                                " XP"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 20
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] font-bold text-zinc-500 uppercase",
                                                            children: "System Score"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-3xl font-bold tracking-tighter text-emerald-600 dark:text-emerald-500",
                                                            children: reliabilityScore.toFixed(0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-800"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: MATURITY_STEPS.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative pl-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all", maturityLevel >= step.level ? "bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800")
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-bold uppercase tracking-wider", maturityLevel >= step.level ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600"),
                                                                        children: [
                                                                            "Level ",
                                                                            step.level,
                                                                            ": ",
                                                                            step.title
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    maturityLevel === step.level && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20 text-[8px] h-4 px-1.5",
                                                                        children: "CURRENT"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 367,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-zinc-500 mt-0.5",
                                                                children: step.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, step.level, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-4 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shadow-sm overflow-hidden relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 p-4 opacity-5 pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                    className: "w-48 h-48 text-purple-500"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "w-4 h-4 text-purple-500"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 386,
                                            columnNumber: 15
                                        }, this),
                                        "Interview Mode"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center justify-center text-center space-y-4 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                                            className: "w-8 h-8 text-purple-500"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 393,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-bold text-zinc-900 dark:text-zinc-200",
                                                children: "Practice Interview"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 396,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-zinc-500 mt-1",
                                                children: "Simulate a post-mortem review or technical interview with an SRE lead."
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 397,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-widest h-9",
                                        onClick: ()=>setShowInterview(true),
                                        children: "Start Session"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 399,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showInterview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.95
                                    },
                                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "max-w-2xl w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl overflow-hidden relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 p-8 opacity-5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                    className: "w-64 h-64 text-purple-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 416,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative z-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "w-5 h-5 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-lg font-bold text-zinc-900 dark:text-zinc-100",
                                                                        children: "Interview with SRE Lead"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 426,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-zinc-500 font-bold uppercase tracking-widest",
                                                                        children: "Post-Incident Review Simulation"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-4",
                                                        children: INTERVIEW_QUESTIONS.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest",
                                                                        children: [
                                                                            "Question ",
                                                                            i + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-zinc-800 dark:text-zinc-200",
                                                                        children: item.q
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 435,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-3 border-t border-zinc-200 dark:border-zinc-800 mt-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[10px] font-bold text-zinc-500 uppercase mb-2",
                                                                                children: "Model SRE Answer"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                                lineNumber: 437,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-zinc-600 dark:text-zinc-400 italic",
                                                                                children: [
                                                                                    '"',
                                                                                    item.a,
                                                                                    '"'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                                lineNumber: 438,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                        lineNumber: 436,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            className: "w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-black font-bold h-10 border-none",
                                                            onClick: ()=>setShowInterview(false),
                                                            children: "Finish Prep Session"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        className: "w-4 h-4 text-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    "Decision Log"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-[10px] font-bold text-zinc-500 uppercase border-zinc-200 dark:border-zinc-800",
                                children: "No-Blame Culture"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-zinc-200 dark:border-zinc-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider",
                                                children: "Timestamp"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider",
                                                children: "Action Taken"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider",
                                                children: "Justification"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider",
                                                children: "Impact"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 474,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: decisionLog.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 4,
                                            className: "py-8 text-center text-xs text-zinc-400 italic",
                                            children: "No decisions recorded yet. Start operating the system!"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 485,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                        lineNumber: 484,
                                        columnNumber: 17
                                    }, this) : decisionLog.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-4 px-4 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono",
                                                    children: new Date(log.timestamp).toLocaleTimeString()
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-4 px-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold text-zinc-900 dark:text-zinc-200",
                                                        children: log.decision
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-4 px-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-zinc-500 dark:text-zinc-400 max-w-xs",
                                                        children: log.reason
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-4 px-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-1.5 h-1.5 rounded-full", log.impact === 'positive' ? "bg-emerald-500" : log.impact === 'negative' ? "bg-rose-500" : "bg-amber-500")
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[9px] font-bold uppercase tracking-widest", log.impact === 'positive' ? "text-emerald-600 dark:text-emerald-500" : log.impact === 'negative' ? "text-rose-600 dark:text-rose-500" : "text-amber-600 dark:text-amber-500"),
                                                                children: log.impact
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, log.id, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                            lineNumber: 489,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                        lineNumber: 472,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(SRELearningHub, "QuEil0de3DPc7vZGUdQT3Aneb2E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = SRELearningHub;
var _c;
__turbopack_context__.k.register(_c, "SRELearningHub");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LearningPanel": (()=>LearningPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const TOPICS = {
    monitoring: {
        title: 'Observability & Monitoring',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
        content: [
            '100% Reliability is the wrong target (it costs too much).',
            'Trade-off: Fast Features vs System Stability.',
            'Trade-off: High Performance vs Infrastructure Cost.',
            'Trade-off: Developer Velocity vs SRE Toil.',
            'SREs use Error Budgets to balance these competing priorities.'
        ]
    }
};
function LearningPanel() {
    _s();
    const { learningTopic, teachingMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    if (!teachingMode) return null;
    const topic = TOPICS[learningTopic || 'monitoring'] || TOPICS.monitoring;
    const Icon = topic.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-emerald-500/20 shadow-lg shadow-emerald-500/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase tracking-widest",
                                children: "SRE Learning Lab"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "w-5 h-5 text-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            topic.title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -10
                        },
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3",
                                children: topic.content.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-sm text-zinc-600 dark:text-zinc-400 flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                                lineNumber: 169,
                                                columnNumber: 19
                                            }, this),
                                            item
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            topic.quiz && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase mb-2",
                                        children: "Quick Quiz"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium text-zinc-800 dark:text-zinc-200",
                                        children: topic.quiz.q
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-zinc-500 mt-2 italic",
                                        children: [
                                            "Answer: ",
                                            topic.quiz.a
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t border-zinc-200 dark:border-zinc-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-zinc-500 italic",
                                    children: 'Tip: Trigger an incident to see how the "Incident Response" module works in real-time.'
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, topic.title, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(LearningPanel, "M0HxJD9kKcVR0vCIoq/9Z5LbCwQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = LearningPanel;
var _c;
__turbopack_context__.k.register(_c, "LearningPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sheet": (()=>Sheet),
    "SheetClose": (()=>SheetClose),
    "SheetContent": (()=>SheetContent),
    "SheetDescription": (()=>SheetDescription),
    "SheetFooter": (()=>SheetFooter),
    "SheetHeader": (()=>SheetHeader),
    "SheetTitle": (()=>SheetTitle),
    "SheetTrigger": (()=>SheetTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Sheet({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "sheet",
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = Sheet;
function SheetTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "sheet-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_c1 = SheetTrigger;
function SheetClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "sheet-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_c2 = SheetClose;
function SheetPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "sheet-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
_c3 = SheetPortal;
function SheetOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "sheet-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c4 = SheetOverlay;
function SheetContent({ className, children, side = "right", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "sheet-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c5 = SheetContent;
function SheetHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1.5 p-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c6 = SheetHeader;
function SheetFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-auto flex flex-col gap-2 p-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c7 = SheetFooter;
function SheetTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "sheet-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-foreground font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c8 = SheetTitle;
function SheetDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "sheet-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_c9 = SheetDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Sheet");
__turbopack_context__.k.register(_c1, "SheetTrigger");
__turbopack_context__.k.register(_c2, "SheetClose");
__turbopack_context__.k.register(_c3, "SheetPortal");
__turbopack_context__.k.register(_c4, "SheetOverlay");
__turbopack_context__.k.register(_c5, "SheetContent");
__turbopack_context__.k.register(_c6, "SheetHeader");
__turbopack_context__.k.register(_c7, "SheetFooter");
__turbopack_context__.k.register(_c8, "SheetTitle");
__turbopack_context__.k.register(_c9, "SheetDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$sre$2d$simulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/sre-simulator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$real$2d$time$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/real-time-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$control$2f$control$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-control/control-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$management$2f$alert$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/alert-list.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$management$2f$rca$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/incident-management/rca-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$terminal$2f$log$2d$terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/terminal/log-terminal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/theme-toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$sre$2d$learning$2d$hub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/dashboard/sre-learning-hub.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$learning$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/learning-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/sre-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    const [selectedIncidentId, setSelectedIncidentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLearningPanelOpen, setIsLearningPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { incidents, sla, teachingMode, setTeachingMode, maturityLevel, experience } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"])();
    const [showLevelUp, setShowLevelUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setMounted(true);
        }
    }["Home.useEffect"], []);
    // Trigger level up notification
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (mounted && maturityLevel > 0) {
                setShowLevelUp(true);
                const timer = setTimeout({
                    "Home.useEffect.timer": ()=>setShowLevelUp(false)
                }["Home.useEffect.timer"], 5000);
                return ({
                    "Home.useEffect": ()=>clearTimeout(timer)
                })["Home.useEffect"];
            }
        }
    }["Home.useEffect"], [
        maturityLevel,
        mounted
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-black"
        }, void 0, false, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
            lineNumber: 61,
            columnNumber: 12
        }, this);
    }
    const activeIncidents = incidents.filter((i)=>i.status !== 'resolved');
    const MATURITY_TITLES = [
        'Manual Ops Fresher',
        'Reactive SRE Apprentice',
        'Proactive SRE Specialist',
        'Automated Systems Engineer',
        'SRE Architect'
    ];
    const SidebarContent = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-zinc-50 dark:bg-zinc-950",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold tracking-tighter text-lg",
                            children: "SRE Incident Response Command Center"
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 76,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-zinc-100 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider",
                                        children: [
                                            "Level ",
                                            maturityLevel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider",
                                        children: [
                                            experience,
                                            " XP"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-bold text-zinc-700 dark:text-zinc-200 mb-2 truncate",
                                children: MATURITY_TITLES[maturityLevel]
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-emerald-500 transition-all duration-500",
                                    style: {
                                        width: `${experience % 250 / 2.5}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, void 0),
                            label: "Live Dashboard",
                            active: activeTab === 'dashboard',
                            onClick: ()=>{
                                setActiveTab('dashboard');
                                setIsMobileMenuOpen(false);
                            }
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 100,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 17
                            }, void 0),
                            label: "Incident Response",
                            active: activeTab === 'incidents',
                            onClick: ()=>{
                                setActiveTab('incidents');
                                setIsMobileMenuOpen(false);
                            },
                            badge: activeIncidents.length > 0 ? activeIncidents.length : undefined
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 106,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 114,
                                columnNumber: 17
                            }, void 0),
                            label: "System Logs",
                            active: activeTab === 'logs',
                            onClick: ()=>{
                                setActiveTab('logs');
                                setIsMobileMenuOpen(false);
                            }
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 113,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 120,
                                columnNumber: 17
                            }, void 0),
                            label: "SRE Training Hub",
                            active: activeTab === 'training',
                            onClick: ()=>{
                                setActiveTab('training');
                                setIsMobileMenuOpen(false);
                            }
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 119,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-6 pb-2 px-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest",
                                children: "Training Mode"
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 126,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTeachingMode(!teachingMode),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group", teachingMode ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold",
                                    children: teachingMode ? 'Learning Active' : 'Basic Mode'
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 129,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 99,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-zinc-100 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-zinc-500 uppercase",
                                        children: "SLA Health"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-500",
                                        children: [
                                            sla.toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-emerald-500 transition-all duration-1000",
                                    style: {
                                        width: `${sla}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 141,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
            lineNumber: 75,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$sre$2d$simulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRESimulator"], {}, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden lg:flex w-64 border-r border-zinc-200 dark:border-zinc-800 flex-col bg-zinc-50 dark:bg-zinc-950 shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarContent, {}, void 0, false, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: isMobileMenuOpen,
                onOpenChange: setIsMobileMenuOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    side: "left",
                    className: "p-0 w-64 border-r border-zinc-800 bg-zinc-950",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                            className: "sr-only",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                    children: "Navigation Menu"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                    children: "Main navigation for the SRE Incident Response Command Center platform"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarContent, {}, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: isLearningPanelOpen,
                onOpenChange: setIsLearningPanelOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    side: "right",
                    className: "p-0 w-80 md:w-96 border-l border-zinc-800 bg-zinc-950",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                            className: "sr-only",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                    children: "Learning Center"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                    children: "Educational resources and SRE concepts"
                                }, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$learning$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LearningPanel"], {}, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showLevelUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            },
                            className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "bg-emerald-600 text-white p-4 shadow-2xl border-none flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white/20 p-2 rounded-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                    className: "w-6 h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] font-bold uppercase tracking-widest opacity-80",
                                                        children: "New Maturity Level"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold",
                                                        children: [
                                                            "Reached Level ",
                                                            maturityLevel,
                                                            "!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "ghost",
                                        className: "text-white hover:bg-white/10",
                                        onClick: ()=>setShowLevelUp(false),
                                        children: "Dismiss"
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 201,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "lg:hidden text-zinc-500",
                                        onClick: ()=>setIsMobileMenuOpen(true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 truncate",
                                        children: activeTab === 'dashboard' ? 'Telemetry' : activeTab === 'incidents' ? 'Incident Response' : activeTab === 'training' ? 'Training Hub' : 'Logs'
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 md:gap-4",
                                children: [
                                    teachingMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        className: "xl:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
                                        onClick: ()=>setIsLearningPanelOpen(true),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:inline",
                                                children: "Learning"
                                            }, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest",
                                            children: "Lab Status: Online"
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-hidden flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-6xl mx-auto space-y-6 md:space-y-8",
                                    children: [
                                        activeTab === 'dashboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$real$2d$time$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealTimeDashboard"], {}, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$control$2f$control$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IncidentControlPanel"], {}, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "lg:col-span-8 min-h-[300px] lg:h-[400px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$terminal$2f$log$2d$terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogTerminal"], {}, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "lg:col-span-4 min-h-[300px] lg:h-[400px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$management$2f$alert$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertList"], {
                                                                onSelect: (id)=>{
                                                                    setSelectedIncidentId(id);
                                                                    setActiveTab('incidents');
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        activeTab === 'incidents' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 min-h-[600px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lg:col-span-4 flex flex-col gap-4 h-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$management$2f$alert$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertList"], {
                                                        onSelect: setSelectedIncidentId
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lg:col-span-8 h-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$incident$2d$management$2f$rca$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RCAPanel"], {
                                                        incidentId: selectedIncidentId,
                                                        onClose: ()=>setSelectedIncidentId(null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        activeTab === 'logs' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$terminal$2f$log$2d$terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogTerminal"], {}, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this),
                                        activeTab === 'training' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-h-[600px]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$dashboard$2f$sre$2d$learning$2d$hub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRELearningHub"], {}, void 0, false, {
                                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            teachingMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "w-80 border-l border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950/50 overflow-y-auto custom-scrollbar hidden xl:block shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$learning$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LearningPanel"], {}, void 0, false, {
                                    fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(Home, "rW0T3/eHiBB0UL1nPB6R4rqkKJE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$sre$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSREStore"]
    ];
});
_c = Home;
function NavItem({ icon, label, active = false, onClick, badge }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group", active ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300"),
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-colors", active ? "text-emerald-600 dark:text-emerald-500" : "group-hover:text-zinc-700 dark:group-hover:text-zinc-300"),
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            badge !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sre$2d$incident$2d$simulator$2d$platform$2f$orchids$2d$sre$2d$incident$2d$simulator$2d$platform$2d$main$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                className: "h-4 px-1 text-[10px] bg-rose-500 text-white border-none min-w-[16px] flex items-center justify-center",
                children: badge
            }, void 0, false, {
                fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sre-incident-simulator-platform/orchids-sre-incident-simulator-platform-main/src/app/page.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, this);
}
_c1 = NavItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "Home");
__turbopack_context__.k.register(_c1, "NavItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=4a279_ent-simulator-platform_orchids-sre-incident-simulator-platform-main_src_86853ac5._.js.map