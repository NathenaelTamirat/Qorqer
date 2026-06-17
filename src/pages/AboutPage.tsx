import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 16,
      stiffness: 80,
      delay: 0.08 * i,
    },
  }),
};

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 12, stiffness: 60, delay: 0.15 * i },
  }),
};

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    setVal(0);
    let frame = 0;
    const total = 60;
    const interval = setInterval(() => {
      frame++;
      setVal(Math.round((to * frame) / total));
      if (frame >= total) { clearInterval(interval); setVal(to); }
    }, 25);
    return () => clearInterval(interval);
  }, [to, inView]);

  return <span ref={ref} className="stat-number">{val}{suffix}</span>;
}

const cards = [
  { icon: "🍳", title: "What is Qoqer?", text: "Qoqer is a traditional Ethiopian breakfast snack, especially popular among the youth. It's a unique street food made with simple ingredients, deep-fried to golden perfection, and enjoyed with a cup of traditional Ethiopian tea or coffee." },
  { icon: "📖", title: "Our Story", text: "Adiss Qoqer started as a small street-side stall, serving the bustling morning crowds. What began as a humble venture quickly grew into a beloved brand known for quality, taste, and that unmistakable authentic flavor." },
  { icon: "🌍", title: "Cultural Roots", text: "Deeply rooted in Ethiopian culinary tradition, Qoqer represents more than just food — it's a cultural experience. Every bite tells a story of community, resourcefulness, and the vibrant spirit of Ethiopian youth." },
  { icon: "❤️", title: "Made with Love", text: "Despite the jokes about \"chinese oil and plastic dough,\" every batch of Qoqer is made with dedication. It's the love and laughter shared over a plate of Qoqer that makes it truly special." },
];

function AboutPage() {
  const { siteName, image2 } = useAppContext();

  return (
    <section className="page-section about-page">
      <div className="page-section-bg" />
      <div className="page-container">
        <motion.div className="page-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span className="section-badge">About</span>
          <h1 className="page-title">{siteName}</h1>
          <p className="page-subtitle">
            The story behind Ethiopia's beloved street snack
          </p>
        </motion.div>

        <div className="about-stats">
          {[
            { to: 15, suffix: "+", label: "Years of Tradition" },
            { to: 100, suffix: "K+", label: "Daily Servings" },
            { to: 50, suffix: "+", label: "Street Stalls" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="stat-card card-glass"
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <CountUp to={s.to} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="about-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="card-glass about-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i + 1}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="about-image-section">
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, damping: 18, stiffness: 80, delay: 0.2 }}
          >
            <div className="about-image-glow" />
            <img src={image2} alt="Qoqer" className="about-feature-img" />
          </motion.div>

          <motion.div
            className="about-quote card-glass"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, damping: 18, stiffness: 80, delay: 0.4 }}
            whileHover={{ y: -6 }}
          >
            <span className="quote-mark">"</span>
            <p>
              Qoqer is not just food — it's a feeling. It's the laughter of
              friends, the warmth of morning, and the taste of home.
            </p>
            <span className="quote-author">— Addis Qoqer</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
