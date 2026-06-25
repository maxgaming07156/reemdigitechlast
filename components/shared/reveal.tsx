"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  as?: "div" | "span";
}

const directionOffsets: Record<string, { x?: number; y?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
};

export function Reveal({ children, delay = 0, className, direction = "up" }: RevealProps) {
  const offset = directionOffsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, direction = "up" }: RevealProps) {
  const offset = directionOffsets[direction];
  const item: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
