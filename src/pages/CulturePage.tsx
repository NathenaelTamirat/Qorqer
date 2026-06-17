import { useAppContext } from "../context/AppContext";
import { useRevealTilt } from "../hooks/useRevealTilt";

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView, onMouseMove, onMouseLeave } = useRevealTilt(0.1);
  const cls = `reveal ${inView ? "reveal--visible" : ""} ${delay > 0 ? `reveal-delay-${delay}` : ""}`;
  return <div ref={ref} className={cls} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>{children}</div>;
}

const facts = [
  { icon: "👥", title: "Youth Favorite", desc: "Qorqer is the go-to breakfast for Ethiopian teenagers and young adults, often enjoyed before school or work." },
  { icon: "🏙️", title: "Street Food Icon", desc: "Found on street corners across Ethiopian cities, Qorqer stalls are a common and cherished morning sight." },
  { icon: "💰", title: "Affordable Delight", desc: "Known for its affordability, Qorqer makes for an accessible and filling meal for everyone." },
  { icon: "🤝", title: "Community Bonding", desc: "Sharing a plate of Qorqer with friends is a social ritual that strengthens bonds and creates memories." },
  { icon: "☕", title: "Perfect Pairing", desc: "Best enjoyed with traditional Ethiopian tea or coffee, the combination is a match made in heaven." },
  { icon: "🎉", title: "A Way of Life", desc: "For many young Ethiopians, Qorqer isn't just breakfast — it's a lifestyle, a tradition, a daily ritual." },
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
        <div className="page-header">
          <span className="section-badge culture-badge">Culture</span>
          <h1 className="page-title">Qorqer Culture</h1>
          <p className="page-subtitle">
            A taste of Ethiopian youth and tradition
          </p>
        </div>

        <RevealCard>
          <div className="culture-showcase card-glass">
            <div className="culture-showcase-img-wrapper">
              <div className="culture-img-glow" />
              <img src={image2} alt="Qorqer culture" className="culture-showcase-img" />
            </div>
            <div className="culture-showcase-text">
              <h3>More Than Just a Snack</h3>
              <p>
                In the bustling streets of Ethiopia, Qorqer represents the energy
                and spirit of a new generation. It's woven into the fabric of
                daily life — from early morning rushes to late-night cravings.
              </p>
            </div>
          </div>
        </RevealCard>

        <div className="culture-grid">
          {facts.map((fact, i) => (
            <RevealCard key={i} delay={i + 1}>
              <div className="culture-fact-card card-glass">
                <span className="fact-icon">{fact.icon}</span>
                <h4>{fact.title}</h4>
                <p>{fact.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CulturePage;
