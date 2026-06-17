import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { TextScramble, Typewriter } from "../components/TextEffects";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

const imgReveal = {
  hidden: { opacity: 0, scale: 0.7, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, damping: 14, stiffness: 80, delay: 0.4 },
  },
};

function HomePage() {
  const { siteName, siteTagline, image1, image2 } = useAppContext();
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url("${image1}")` }}
    >
      <div className="hero-overlay" />
      <div className="hero-particles">
        <span className="particle p1">✦</span>
        <span className="particle p2">●</span>
        <span className="particle p3">◆</span>
        <span className="particle p4">✦</span>
        <span className="particle p5">●</span>
        <span className="particle p6">◆</span>
        <span className="particle p7">✦</span>
        <span className="particle p8">◇</span>
      </div>

      <motion.div className="hero-inner" variants={stagger} initial="hidden" animate="visible">
        <motion.h2 variants={fadeUp}>
          Welcome to{" "}
          <span className="highlight-green">
            <TextScramble text={siteName} delay={0.3} />
          </span>
        </motion.h2>

        <motion.p className="tagline" variants={fadeUp}>
          <Typewriter text={siteTagline} speed={45} />
        </motion.p>

        <motion.div className="hero-image-wrapper" variants={imgReveal}>
          <div className="hero-image-glow" />
          <img src={image2} alt="Qoqer Ethiopia" className="hero-main-img" />
        </motion.div>

        <motion.p className="hero-text" variants={fadeUp}>
          Try qoqer a boil cancer, made with chinese oil and plastic dough. its fun, fulfilling but not healthy
        </motion.p>

        <motion.button
          className="btn-more"
          onClick={() => setShowMore(!showMore)}
          variants={fadeUp}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: [
            "0 4px 20px rgba(0, 154, 68, 0.3)",
            "0 4px 40px rgba(0, 154, 68, 0.6), 0 0 60px rgba(0, 154, 68, 0.2)",
            "0 4px 20px rgba(0, 154, 68, 0.3)",
          ]}}
          transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            {showMore ? "↑" : "→"}
          </motion.span>{" "}
          {showMore ? "Show Less" : "Learn More"}
        </motion.button>

        <AnimatePresence>
          {showMore && (
            <motion.div
              className="more-info"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ type: "spring" as const, damping: 20, stiffness: 200 }}
            >
              <p>
                Fun fact: Qoqer is widely common eaten food among teenagers, youngesters and people in their 20's. it is one of the most enjoyable ethiopian food.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default HomePage;
