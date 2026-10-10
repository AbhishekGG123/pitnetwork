"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Store() {
  return (
    <main className="min-h-screen py-20 px-4 relative flex flex-col items-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />

      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">Magical <span className="text-emerald-400">Marketplace</span></h1>
          <p className="text-xl text-gray-400">Support the server and unlock exclusive legendary ranks.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "VIP", price: "4.99", color: "from-blue-500 to-blue-700" },
            { name: "MVP", price: "14.99", color: "from-purple-500 to-purple-700" },
            { name: "OVERLORD", price: "24.99", color: "from-emerald-400 to-emerald-600", popular: true },
          ].map((rank, i) => (
            <motion.div
              key={rank.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center ${rank.popular ? 'shadow-[0_0_30px_rgba(52,211,153,0.3)] border-emerald-500' : ''}`}
            >
              {rank.popular && (
                <div className="absolute top-0 transform -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rank.color} mb-6 shadow-lg flex items-center justify-center transform rotate-3`}>
                <ShoppingCart size={40} className="text-white opacity-80" />
              </div>

              <h3 className="text-3xl font-extrabold mb-2">{rank.name}</h3>
              <div className="text-2xl font-mono text-gray-300 mb-8">${rank.price}</div>

              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-colors">
                Purchase Rank
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
