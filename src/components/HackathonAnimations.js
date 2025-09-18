import React from "react";
import { motion } from "framer-motion";

// Minimal demo to ensure animation works: floating labels appear and fade around a central card.
// If this shows correctly, we can layer back the advanced UI.

const VARIANTS = [
  "Codefest",
  "Datathon",
  "Design Jam",
  "Startup Weekend",
  "Impactathon",
];

const positions = [
  { x: -120, y: -80 },
  { x: 140, y: -60 },
  { x: -160, y: 100 },
  { x: 150, y: 120 },
  { x: 0, y: -150 },
];

export default function HackathonMinimalUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Floating variant labels */}
      {VARIANTS.map((text, i) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute px-4 py-2 rounded-full bg-white/80 border shadow text-sm font-medium text-slate-700"
          style={{
            left: `calc(50% + ${positions[i].x}px)`,
            top: `calc(50% + ${positions[i].y}px)`,
          }}
        >
          {text}
        </motion.div>
      ))}

      {/* Core meaning in center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-80 rounded-3xl shadow-xl border bg-white/90 backdrop-blur-xl p-6 text-center"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Hackathon</h1>
        <p className="text-slate-600 text-sm">
          A time-boxed sprint where people build and share a working solution.
        </p>
      </motion.div>
    </div>
  );
}
