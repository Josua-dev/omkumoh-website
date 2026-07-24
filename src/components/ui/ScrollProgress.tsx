"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="progress-bar fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #3B6FA0, #7BC4C4)" }}
    />
  );
}
