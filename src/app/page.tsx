"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MinecraftWorld from "@/components/MinecraftWorld";
import ServerStatus from "@/components/ServerStatus";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/config";
import { Copy, Play } from "lucide-react";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(config.server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-900">
      <AnimatePresence>
        {!loadingComplete && (
          <LoadingScreen onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {/* 3D Environment Background */}
      {loadingComplete && <MinecraftWorld />}

      {/* UI Overlay */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            <div className="pointer-events-auto w-full max-w-4xl mx-auto">
              <motion.img
                src={config.server.logo}
                alt={config.server.name}
                className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto mb-8 drop-shadow-[0_0_25px_rgba(0,255,204,0.5)]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6">
                YOUR NEXT ADVENTURE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">BEGINS HERE</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow-md">
                {config.server.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={handleCopyIP}
                  className="group relative flex items-center gap-3 px-8 py-4 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md border border-slate-600 rounded-lg text-white font-bold text-lg transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Copy size={24} className={copied ? "text-emerald-400" : "text-gray-400"} />
                  <span>{copied ? "IP COPIED!" : config.server.ip}</span>
                </button>

                <a
                  href={config.links.store}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-lg rounded-lg transition-all shadow-[0_0_25px_rgba(52,211,153,0.5)] hover:shadow-[0_0_35px_rgba(52,211,153,0.8)] hover:-translate-y-1"
                >
                  <Play size={24} className="fill-white" />
                  <span>PLAY NOW</span>
                </a>
              </div>

              <ServerStatus />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
