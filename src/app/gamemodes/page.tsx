"use client";

import { motion } from "framer-motion";
import { Swords, HeartPulse, Box } from "lucide-react";

const modes = [
  { id: "survival", name: "Survival", desc: "Classic multiplayer survival with economy.", icon: Box, color: "text-emerald-400" },
  { id: "kitpvp", name: "KitPvP", desc: "Fast-paced combat with custom kits.", icon: Swords, color: "text-red-400" },
  { id: "lifesteal", name: "Lifesteal", desc: "Kill players to steal their hearts.", icon: HeartPulse, color: "text-rose-500" },
];

export default function GameModes() {
  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">Portals to <span className="text-emerald-400">Other Worlds</span></h1>
          <p className="text-xl text-gray-400">Discover our unique game modes and begin your journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-all hover:border-slate-500 hover:shadow-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 pointer-events-none" />

              <mode.icon size={48} className={`mb-6 ${mode.color} drop-shadow-md group-hover:scale-110 transition-transform`} />

              <h3 className="text-2xl font-bold mb-3">{mode.name}</h3>
              <p className="text-gray-400">{mode.desc}</p>

              <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300">
                Explore Portal →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
