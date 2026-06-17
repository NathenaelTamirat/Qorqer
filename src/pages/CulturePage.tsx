import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(3px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 14, stiffness: 70, delay: 0.1 * i },
  }),
};

const facts = [
  { icon: "👥", title: "Youth Favorite", desc: "Qoqer is the go-to breakfast for Ethiopian teenagers and young adults, often enjoyed before school or work." },
  { icon: "🏙️", title: "Street Food Icon", desc: "Found on street corners across Ethiopian cities, Qoqer stalls are a common and cherished morning sight." },
  { icon: "💰", title: "Affordable Delight", desc: "Known for its affordability, Qoqer makes for an accessible and filling meal for everyone." },
  { icon: "🤝", title: "Community Bonding", desc: "Sharing a plate of Qoqer with friends is a social ritual that strengthens bonds and creates memories." },
  { icon: "☕", title: "Perfect Pairing", desc: "Best enjoyed with traditional Ethiopian tea or coffee, the combination is a match made in heaven." },
  { icon: "🎉", title: "A Way of Life", desc: "For many young Ethiopians, Qoqer isn't just breakfast — it's a lifestyle, a tradition, a daily ritual." },
];

function CulturePage() {
  const { image2 } = useAppContext();

  return (
    <section className="page-section culture-page">
      <div className="emoji-rain">
        <span>🍳</span><span>🥟</span><span>☕</span><span>🌅</span>
        <span>🎉</span><span>🤝</span><span>💰</span><span>🏙️</span>
        <span>❤️</span><span>✨</span>
      </div>
      <div className="page-section-bg" />

      <div className="page-container">
        <motion.div className="page-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span className="section-badge culture-badge">Culture</span>
          <h1 className="page-title">Qoqer Culture</h1>
          <p className="page-subtitle">
            A taste of Ethiopian youth and tradition
          </p>
        </motion.div>

        <motion.div
          className="culture-showcase card-glass"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, damping: 16, stiffness: 80 }}
          whileHover={{ y: -6 }}
        >
          <div className="culture-showcase-img-wrapper">
            <div className="culture-img-glow" />
            <img src={image2} alt="Qoqer culture" className="culture-showcase-img" />
          </div>
          <div className="culture-showcase-text">
            <h3>More Than Just a Snack</h3>
            <p>
              In the bustling streets of Ethiopia, Qoqer represents the energy
              and spirit of a new generation. It's woven into the fabric of
              daily life — from early morning rushes to late-night cravings.
            </p>
          </div>
        </motion.div>

        <div className="culture-grid">
          {facts.map((fact, i) => (
            <motion.div
              key={i}
              className="culture-fact-card card-glass"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i + 1}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <span className="fact-icon">{fact.icon}</span>
              <h4>{fact.title}</h4>
              <p>{fact.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CulturePage;
