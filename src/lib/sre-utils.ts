import { Incident, IncidentType, Severity } from './sre-store';

export const INCIDENT_CONFIGS: Record<IncidentType, { description: string; severity: Severity; service: string; beginnerDescription: string }> = {
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
    },
  };
  
  export function getRCA(type: IncidentType) {
    const causes: Record<IncidentType, { 
      cause: string; 
      confidence: number; 
      explanation: string;
      learningSteps: { step: number; title: string; description: string }[];
    }> = {
      cpu_spike: {
        cause: 'Unoptimized Query Execution',
        confidence: 0.85,
        explanation: 'Increased CPU load correlated with a deployment of a new reporting module. Large table scans are consuming cycles.',
        learningSteps: [
          { step: 1, title: 'Metric Anomaly', description: 'Notice the CPU usage jumped from 15% to 85% suddenly.' },
          { step: 2, title: 'Correlation', description: 'SREs check logs and see this matches a new code deployment.' },
          { step: 3, title: 'Root Cause', description: 'The new code has a "Search" feature that doesn\'t use an index, forcing the CPU to scan every row.' }
        ]
      },
      memory_leak: {
        cause: 'Closure Reference Leak',
        confidence: 0.92,
        explanation: 'Heap snapshots show a growing number of uncollected objects in the event listener array of the worker process.',
        learningSteps: [
          { step: 1, title: 'Steady Growth', description: 'Memory usage is slowly climbing in a straight line, never going down.' },
          { step: 2, title: 'Health Check', description: 'SREs notice the service restarts every 4 hours because it runs out of RAM.' },
          { step: 3, title: 'Root Cause', description: 'A variable in the code is holding onto data it no longer needs, "leaking" memory.' }
        ]
      },
      disk_saturation: {
        cause: 'Log Rotation Failure',
        confidence: 0.78,
        explanation: 'Access logs are not being rotated correctly, causing the root partition to fill up and slowing down I/O operations.',
        learningSteps: [
          { step: 1, title: 'Disk Usage', description: 'The disk space alert triggered at 90% capacity.' },
          { step: 2, title: 'I/O Wait', description: 'Because the disk is full, the system takes longer to write new data.' },
          { step: 3, title: 'Root Cause', description: 'The system forgot to delete old log files, filling up the storage "cabinet".' }
        ]
      },
      network_loss: {
        cause: 'Cloud Provider Interruption',
        confidence: 0.65,
        explanation: 'Packet loss detected across multiple Availability Zones. Correlated with provider status alerts in us-east-1.',
        learningSteps: [
          { step: 1, title: 'Connectivity Drop', description: 'Multiple services suddenly can\'t talk to each other.' },
          { step: 2, title: 'External Check', description: 'SREs check the AWS/Azure status page and see an outage.' },
          { step: 3, title: 'Root Cause', description: 'A physical fiber optic cable was damaged at the data center.' }
        ]
      },
      high_latency: {
        cause: 'Upstream Service Bottleneck',
        confidence: 0.88,
        explanation: 'Latency in the frontend service matches exactly with response time increases in the checkout-service API.',
        learningSteps: [
          { step: 1, title: 'Slow Response', description: 'The "Time to First Byte" metric increased by 2 seconds.' },
          { step: 2, title: 'Trace Analysis', description: 'Looking at a "Trace", we see the Frontend is waiting on the Backend.' },
          { step: 3, title: 'Root Cause', description: 'The Backend service is slow, causing a "waterfall" effect of slowness.' }
        ]
      },
      error_rate_surge: {
        cause: 'Incorrect Environment Secret',
        confidence: 0.95,
        explanation: 'Authentication service is failing to connect to the DB due to an invalid TLS certificate path in the latest deployment config.',
        learningSteps: [
          { step: 1, title: '5xx Errors', description: 'The Error Rate chart is showing a huge spike in red.' },
          { step: 2, title: 'Log Inspection', description: 'Logs show "Access Denied" or "Invalid Password" errors.' },
          { step: 3, title: 'Root Cause', description: 'A developer updated a password but forgot to update it in the server settings.' }
        ]
      },
      pod_crash: {
        cause: 'Resource Limit Exceeded',
        confidence: 0.82,
        explanation: 'OOM Killer terminated the process. The pod requested 256Mi but attempted to use 512Mi during peak traffic.',
        learningSteps: [
          { step: 1, title: 'Restart Loop', description: 'Kubernetes shows the pod status as "CrashLoopBackOff".' },
          { step: 2, title: 'Events View', description: 'The system events say "OOMKilled" (Out Of Memory Killed).' },
          { step: 3, title: 'Root Cause', description: 'The container tried to use more memory than we allowed it to have.' }
        ]
      },
      service_down: {
        cause: 'DNS Resolution Failure',
        confidence: 0.74,
        explanation: 'Internal service discovery is failing to resolve the hostname. Possibly a CoreDNS config issue.',
        learningSteps: [
          { step: 1, title: 'Zero Traffic', description: 'Requests to the service are failing with "Host Not Found".' },
          { step: 2, title: 'Network Test', description: 'Trying to ping the service manually also fails.' },
          { step: 3, title: 'Root Cause', description: 'The system "address book" (DNS) is broken, so it can\'t find the service.' }
        ]
      },
      db_exhaustion: {
        cause: 'Zombie Connection Leak',
        confidence: 0.91,
        explanation: 'Client applications are not properly closing connections in the finally block of the data access layer.',
        learningSteps: [
          { step: 1, title: 'Connection Alert', description: 'Database connections hit the maximum limit of 100.' },
          { step: 2, title: 'Wait Queue', description: 'New requests are waiting in a queue to talk to the DB.' },
          { step: 3, title: 'Root Cause', description: 'The application is opening "doors" to the DB but never closing them.' }
        ]
      },
      cache_storm: {
        cause: 'Massive Key Expiration',
        confidence: 0.84,
        explanation: 'TTL settings for product catalog keys were set to the same value, causing simultaneous expiration and DB thundering herd.',
        learningSteps: [
          { step: 1, title: 'Cache Miss', description: 'Suddenly, the cache hit rate dropped from 99% to 10%.' },
          { step: 2, title: 'DB Load', description: 'The Database CPU spiked because it\'s doing all the work now.' },
          { step: 3, title: 'Root Cause', description: 'All the "shortcuts" expired at the exact same second.' }
        ]
      },
      ddos_attack: {
        cause: 'Malicious Traffic Spike',
        confidence: 0.98,
        explanation: 'Traffic analysis shows 95% of requests coming from a distributed set of IPs targeting the search endpoint.',
        learningSteps: [
          { step: 1, title: 'Traffic Spike', description: 'RPS increased from 1,000 to 50,000 in 10 seconds.' },
          { step: 2, title: 'Impact', description: 'The system can\'t handle this many people trying to use it at once.' },
          { step: 3, title: 'Root Cause', description: 'Bad actors are intentionally overwhelming our servers with fake traffic.' }
        ]
      },
      bad_deployment: {
        cause: 'Code Regression',
        confidence: 1.0,
        explanation: 'Errors started immediately following deployment of v1.4.2. Rollback to v1.4.1 resolved the issue.',
        learningSteps: [
          { step: 1, title: 'Deployment', description: 'A new version of the code was just released.' },
          { step: 2, title: 'Immediate Failure', description: 'The error rate chart turned solid red right after the release.' },
          { step: 3, title: 'Root Cause', description: 'The new code contains a bug that prevents it from working.' }
        ]
      },
      capacity_exhausted: {
        cause: 'Organic Growth Overload',
        confidence: 0.89,
        explanation: 'The system is hitting its natural limits because too many real users are accessing it at once.',
        learningSteps: [
          { step: 1, title: 'High Usage', description: 'Everything is slow because there are so many users.' },
          { step: 2, title: 'Scaling Limit', description: 'We tried to add more servers but we hit our cloud provider\'s limit.' },
          { step: 3, title: 'Root Cause', description: 'The application is more popular than our current infrastructure can support.' }
        ]
      },
      dns_outage: {
        cause: 'Domain Expiration',
        confidence: 0.99,
        explanation: 'WHOIS lookups show the internal domain service.local has expired or been misconfigured.',
        learningSteps: [
          { step: 1, title: 'Total Silence', description: 'No services can talk to each other anymore.' },
          { step: 2, title: 'Lookup Failure', description: 'The servers are asking "Who is api-gateway?" and getting no answer.' },
          { step: 3, title: 'Root Cause', description: 'The internet "address book" service is broken or inaccessible.' }
        ]
      },
    };
    return causes[type];
  }
  
  export function getRemediation(type: IncidentType) {
    const steps: Record<IncidentType, { steps: string[]; action: string; learningExplanation: string }> = {
      cpu_spike: {
        steps: ['Identify long-running queries', 'Add indexes to affected tables', 'Horizontal scale API nodes'],
        action: 'Scale Replicas',
        learningExplanation: 'By adding more servers (replicas), we share the heavy workload among more "workers", reducing the stress on each one.'
      },
      memory_leak: {
        steps: ['Capture heap profile', 'Identify leaking module', 'Rolling restart workers'],
        action: 'Restart Pods',
        learningExplanation: 'Restarting the service is like "turning it off and on again". it clears the leaked memory and gives the app a fresh start.'
      },
      disk_saturation: {
        steps: ['Purge temporary files', 'Fix logrotate configuration', 'Increase EBS volume size'],
        action: 'Clear Disk',
        learningExplanation: 'We delete old log files that aren\'t needed anymore, making room for new data to be written quickly.'
      },
      network_loss: {
        steps: ['Reroute traffic to us-west-2', 'Engage provider support', 'Monitor VPC peering'],
        action: 'Failover Region',
        learningExplanation: 'If one data center is broken, we "failover" or move all our users to a different, healthy data center in another city.'
      },
      high_latency: {
        steps: ['Enable CDN caching', 'Optimize payload size', 'Implement circuit breaker'],
        action: 'Apply Circuit Breaker',
        learningExplanation: 'A circuit breaker stops requests to a slow service so it doesn\'t crash. It "fails fast" instead of making users wait forever.'
      },
      error_rate_surge: {
        steps: ['Verify env variables', 'Check DB connectivity', 'Rollback to v1.2.4'],
        action: 'Rollback Deployment',
        learningExplanation: 'Rollback means "undo". We go back to the previous version of the code that we know worked perfectly.'
      },
      pod_crash: {
        steps: ['Check container logs', 'Increase memory limits', 'Verify startup probe'],
        action: 'Increase Limits',
        learningExplanation: 'We give the service more "room to breathe" by increasing its allowed CPU or Memory limits in the settings.'
      },
      service_down: {
        steps: ['Verify service status', 'Restart ingress controller', 'Update DNS records'],
        action: 'Restart Service',
        learningExplanation: 'We manually trigger a restart of the core service to reset its network connections and internal state.'
      },
      db_exhaustion: {
        steps: ['Kill idle connections', 'Increase max_connections', 'Implement connection pooling'],
        action: 'Flush Connections',
        learningExplanation: 'We force-close all the "zombie" connections that aren\'t doing anything, freeing up slots for new users.'
      },
      cache_storm: {
        steps: ['Re-populate cache with jitter', 'Increase Redis memory', 'Implement request collapsing'],
        action: 'Repopulate Cache',
        learningExplanation: 'We slowly put the shortcuts back into the cache so the database doesn\'t get overwhelmed by too much work at once.'
      },
      ddos_attack: {
        steps: ['Enable WAF rate limiting', 'Block malicious IP ranges', 'Activate Under Attack mode'],
        action: 'Enable Rate Limiting',
        learningExplanation: 'Rate limiting says "you can only visit this many times per minute". This stops bots from overloading the server while letting real users through.'
      },
      bad_deployment: {
        steps: ['Verify commit history', 'Analyze failed tests', 'Rollback to stable'],
        action: 'Rollback Release',
        learningExplanation: 'We immediately undo the latest change because it is causing problems for our users.'
      },
      capacity_exhausted: {
        steps: ['Auto-scale horizontally', 'Optimize resource requests', 'Upgrade instance type'],
        action: 'Scale Horizontally',
        learningExplanation: 'We add more servers to handle the increased number of users. It is like opening more checkout lanes at a busy grocery store.'
      },
      dns_outage: {
        steps: ['Check domain expiration', 'Update name servers', 'Flush local DNS cache'],
        action: 'Fix DNS Config',
        learningExplanation: 'We fix the address book so the servers can find each other again and resume normal communication.'
      },
    };
    return steps[type];
  }

