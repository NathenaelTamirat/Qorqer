import { useEffect } from "react";
import { motion } from "framer-motion";

const letters = "Adiss Qoqer".split("");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.025, delayChildren: 0.6 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 120, rotateX: -80, scale: 0.2, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 10, stiffness: 100, mass: 0.5 },
  },
};

const letterGlow = {
  hidden: { color: "#000", textShadow: "0 0 0px rgba(0,154,68,0)" },
  visible: {
    color: "#009a44",
    textShadow: [
      "0 0 10px rgba(0,154,68,0)",
      "0 0 20px rgba(0,154,68,0.3)",
      "0 0 40px rgba(0,154,68,0.5)",
      "0 0 20px rgba(0,154,68,0.3)",
      "0 0 10px rgba(0,154,68,0)",
    ],
    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const },
  },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.25,
    transition: { duration: 2.5, delay: i * 0.3, ease: "easeInOut" as const },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: [0, 1.3, 1],
    opacity: [0, 1, 0.6],
    transition: { delay: 1.8 + i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const t1 = setTimeout(onFinish, 5200);
    return () => clearTimeout(t1);
  }, [onFinish]);

  return (
    <motion.div
      className="splash-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.7, ease: "easeInOut" as const }}
    >
      <svg className="splash-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M 100 50 Q 400 -30 700 50" fill="none" stroke="#009a44" strokeWidth="1.5"
          variants={lineVariants} initial="hidden" animate="visible" custom={0} />
        <motion.path d="M 50 450 Q 400 530 750 450" fill="none" stroke="#009a44" strokeWidth="1"
          variants={lineVariants} initial="hidden" animate="visible" custom={1} />
        <motion.ellipse cx="400" cy="250" rx="300" ry="160" fill="none" stroke="#009a44" strokeWidth="1" strokeDasharray="1"
          variants={lineVariants} initial="hidden" animate="visible" custom={2} />
        <motion.path d="M 80 100 L 150 60 L 140 130 Z" fill="none" stroke="#fcdd09" strokeWidth="1.5"
          variants={lineVariants} initial="hidden" animate="visible" custom={3} />
        <motion.path d="M 720 100 L 650 60 L 660 130 Z" fill="none" stroke="#fcdd09" strokeWidth="1.5"
          variants={lineVariants} initial="hidden" animate="visible" custom={4} />
        <motion.path d="M 80 400 L 150 440 L 140 370 Z" fill="none" stroke="#da121a" strokeWidth="1"
          variants={lineVariants} initial="hidden" animate="visible" custom={5} />
        <motion.path d="M 720 400 L 650 440 L 660 370 Z" fill="none" stroke="#da121a" strokeWidth="1"
          variants={lineVariants} initial="hidden" animate="visible" custom={6} />
        <motion.circle cx="400" cy="250" r="180" fill="none" stroke="#009a44" strokeWidth="0.5" strokeDasharray="8 4"
          variants={lineVariants} initial="hidden" animate="visible" custom={7} />
        <motion.path d="M 400 70 L 400 430" fill="none" stroke="#fcdd09" strokeWidth="0.5" strokeDasharray="4 6"
          variants={lineVariants} initial="hidden" animate="visible" custom={8} />
      </svg>

      <motion.div className="splash-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="splash-title"
          variants={letterGlow}
          initial="hidden"
          animate="visible"
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="splash-letter"
              variants={letterVariants}
              custom={i}
              style={{
                display: "inline-block",
                width: ch === " " ? "0.35em" : "auto",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="splash-tagline"
          initial={{ opacity: 0, y: 30, scale: 0.5, filter: "blur(6px)" }}
          animate={{
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            transition: { type: "spring" as const, damping: 12, stiffness: 80, delay: 1.6 },
          }}
        >
          Ethiopian Youth Breakfast Snack
        </motion.p>

        <div className="splash-dots">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="splash-dot"
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SplashScreen;
