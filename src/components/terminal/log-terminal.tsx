'use client';

import { useSREStore } from '@/lib/sre-store';
import { Terminal, ChevronRight, Info, AlertTriangle, XCircle, CheckCircle, Command } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function LogTerminal() {
  const { logs, metrics, incidents, resolveIncident, addLog, onCommand } = useSREStore();
  const [command, setCommand] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'cmd' | 'resp'; text: string; timestamp: number }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, terminalHistory]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.trim().toLowerCase();
    const newEntry = { type: 'cmd' as const, text: command, timestamp: Date.now() };
    setTerminalHistory(prev => [...prev, newEntry]);
    setCommand('');
    onCommand(cmd);

    // Simulate command processing
    setTimeout(() => {
      let response = '';
      if (cmd === 'help') {
        response = 'Available commands: kubectl, top, df -h, curl, dig, clear, help';
      } else if (cmd.startsWith('kubectl get pods')) {
        const pods = Array.from({ length: metrics.podCount }).map((_, i) => 
          `api-gateway-${Math.random().toString(36).substring(7)}   1/1   Running   0   ${Math.floor(Math.random() * 10)}h`
        ).join('\n');
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

      setTerminalHistory(prev => [...prev, { type: 'resp' as const, text: response, timestamp: Date.now() }]);
    }, 200);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex flex-col h-full font-mono shadow-sm group">
      <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-zinc-500 dark:text-zinc-500" />
          <span className="text-[10px] text-zinc-600 dark:text-zinc-400 uppercase font-bold tracking-widest">Interactive SRE Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 text-[11px] custom-scrollbar bg-black"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Mixed logs and terminal history */}
        <div className="space-y-1">
          <div className="text-zinc-700 italic mb-4 border-b border-zinc-900 pb-2">
            System initialized. Type 'help' for commands.
          </div>
          
          {/* Display logic: merging logs and terminal interaction */}
          {[...logs.map(l => ({ ...l, isLog: true })), ...terminalHistory.map(h => ({ ...h, isLog: false }))]
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(-100)
            .map((item, i) => {
              if ('isLog' in item && item.isLog) {
                const log = item as any;
                return (
                  <div key={`log-${i}`} className="flex gap-3 leading-relaxed opacity-70 hover:opacity-100 transition-opacity">
                    <span className="text-zinc-600 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={cn(
                      "flex items-center gap-1.5",
                      log.type === 'error' && "text-rose-500",
                      log.type === 'warn' && "text-amber-500",
                      log.type === 'success' && "text-emerald-500",
                      log.type === 'info' && "text-blue-500"
                    )}>
                      {log.type === 'error' && <XCircle className="w-3 h-3" />}
                      {log.type === 'warn' && <AlertTriangle className="w-3 h-3" />}
                      {log.type === 'success' && <CheckCircle className="w-3 h-3" />}
                      {log.type === 'info' && <Info className="w-3 h-3" />}
                      {log.message}
                    </span>
                  </div>
                );
              } else {
                const entry = item as any;
                return (
                  <div key={`cmd-${i}`} className="space-y-1">
                    {entry.type === 'cmd' ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <ChevronRight className="w-3 h-3" />
                        <span className="font-bold">{entry.text}</span>
                      </div>
                    ) : (
                      <div className="text-zinc-300 pl-5 whitespace-pre-wrap leading-tight font-mono">
                        {entry.text}
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>

      <form onSubmit={handleCommand} className="p-2 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0">
        <span className="text-emerald-500 font-bold ml-2 shrink-0 text-xs">$</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter SRE command..."
          className="bg-transparent border-none outline-none text-zinc-200 text-xs font-mono w-full placeholder:text-zinc-700"
          autoFocus
        />
        <Command className="w-3 h-3 text-zinc-700 mr-2" />
      </form>
    </div>
  );
}
