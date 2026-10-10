"use client";

import { useState, useEffect } from "react";
import { config } from "@/config";

interface ServerStatusData {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: string;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${config.server.ip}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        setStatus({
          online: data.online,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
          },
          version: data.version || config.server.versions,
        });
      } catch (err) {
        console.error("Failed to fetch server status:", err);
        setError(true);
        // Fallback fake data if the actual API fails or is rate-limited
        // Note: The prompt says "Never invent live server statistics", so if error, show offline
        setStatus({ online: false, players: { online: 0, max: 0 }, version: "Unknown" });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 text-gray-400 font-mono text-sm">
        <span className="animate-pulse">Pinging server...</span>
      </div>
    );
  }

  if (error || !status?.online) {
    return (
      <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-red-500/30 text-red-400 font-mono text-sm">
        <span className="h-2 w-2 rounded-full bg-red-500"></span>
        SERVER OFFLINE
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/50 backdrop-blur-md rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-emerald-400 font-mono font-medium tracking-wide">
          {status.players.online.toLocaleString()} <span className="text-gray-400">/ {status.players.max.toLocaleString()} PLAYERS</span>
        </span>
      </div>
      <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">
        VERSION: {status.version}
      </span>
    </div>
  );
}
