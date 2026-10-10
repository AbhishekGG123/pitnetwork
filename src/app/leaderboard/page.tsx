"use client";

import { motion } from "framer-motion";

export default function Leaderboard() {
  return (
    <main className="min-h-screen py-20 px-4 relative flex flex-col items-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">Hall of <span className="text-emerald-400">Legends</span></h1>
          <p className="text-xl text-gray-400">The most dedicated players of our realms.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-slate-700">
                <th className="p-4 font-bold text-gray-400 uppercase">Rank</th>
                <th className="p-4 font-bold text-gray-400 uppercase">Player</th>
                <th className="p-4 font-bold text-gray-400 uppercase">Kills</th>
                <th className="p-4 font-bold text-gray-400 uppercase">Playtime</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Notch", kills: 12450, time: "450h" },
                { name: "Jeb_", kills: 9840, time: "320h" },
                { name: "Dinnerbone", kills: 7420, time: "280h" },
              ].map((player, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-400">#{i + 1}</td>
                  <td className="p-4 font-bold flex items-center gap-3">
                    <img src={`https://minotar.net/helm/${player.name}/32.png`} alt={player.name} className="rounded" />
                    {player.name}
                  </td>
                  <td className="p-4 text-gray-300 font-mono">{player.kills.toLocaleString()}</td>
                  <td className="p-4 text-gray-300 font-mono">{player.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}
