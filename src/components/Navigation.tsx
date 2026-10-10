"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "@/config";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Game Modes", href: "/gamemodes" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Store", href: "/store" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/">
                <img src={config.server.logo} alt="Logo" className="h-12 w-auto drop-shadow-md" />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors ${
                      pathname === link.href
                        ? "text-emerald-400 bg-white/5"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <a
                href={config.links.discord}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2 border border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white rounded-lg font-bold transition-colors"
              >
                Discord
              </a>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 bg-slate-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 rounded-md text-xl font-bold uppercase tracking-widest text-center w-full ${
                    pathname === link.href
                      ? "text-emerald-400 bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={config.links.discord}
                target="_blank"
                rel="noreferrer"
                className="mt-6 px-6 py-3 bg-[#5865F2] text-white rounded-lg font-bold w-full text-center"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
