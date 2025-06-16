import { motion } from "framer-motion";
import { FloatingCircleProps } from "@/types/components";

export const FloatingCircle = ({
  delay = 0,
  size = 100,
  color = "white",
  className = "",
}: FloatingCircleProps) => (
  <motion.div
    className={`absolute rounded-full opacity-40 blur-md ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
    }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
      borderRadius: ["50%", "40%", "50%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);
