"use client";

import { motion } from "framer-motion";

export function AnimatedTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-4xl md:text-6xl font-bold text-sky-300 mb-6 drop-shadow-lg text-center"
    >
      Tu Tranquilidad Fiscal, <span className="text-white">Nuestra Misión.</span>
    </motion.h1>
  );
}
