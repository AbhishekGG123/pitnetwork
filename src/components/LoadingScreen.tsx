"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      <div className="absolute top-8 right-8 flex gap-4">
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <SkipForward size={20} />
          <span>Skip Intro</span>
        </button>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-widest uppercase text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
          Entering a New Dimension
        </h1>

        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden mt-8">
          <motion.div
            className="h-full bg-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-gray-400 font-mono">{progress}% Loading Assets...</p>
      </div>

      {/* Background portal effect (simple CSS radial gradient for now) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black opacity-60" />
    </motion.div>
  );
}
