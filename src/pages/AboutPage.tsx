import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useRevealTilt } from "../hooks/useRevealTilt";

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView, onMouseMove, onMouseLeave } = useRevealTilt(0.1);
  const cls = `reveal ${inView ? "reveal--visible" : ""} ${delay > 0 ? `reveal-delay-${delay}` : ""}`;
  return <div ref={ref} className={cls} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>{children}</div>;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useRevealTilt(0.5);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const interval = setInterval(() => {
      frame++;
      setVal(Math.round((to * frame) / total));
      if (frame >= total) { clearInterval(interval); setVal(to); }
    }, 25);
    return () => clearInterval(interval);
  }, [inView, to]);

  return <span ref={ref} className="stat-number">{val}{suffix}</span>;
}

const cards = [
  { icon: "🍳", title: "What is Qorqer?", text: "Qorqer is a traditional Ethiopian breakfast snack, especially popular among the youth. It's a unique street food made with simple ingredients, deep-fried to golden perfection, and enjoyed with a cup of traditional Ethiopian tea or coffee." },
  { icon: "📖", title: "Our Story", text: "Adiss Qorqer started as a small street-side stall, serving the bustling morning crowds. What began as a humble venture quickly grew into a beloved brand known for quality, taste, and that unmistakable authentic flavor." },
  { icon: "🌍", title: "Cultural Roots", text: "Deeply rooted in Ethiopian culinary tradition, Qorqer represents more than just food — it's a cultural experience. Every bite tells a story of community, resourcefulness, and the vibrant spirit of Ethiopian youth." },
  { icon: "❤️", title: "Made with Love", text: "Despite the jokes about \"chinese oil and plastic dough,\" every batch of Qorqer is made with dedication. It's the love and laughter shared over a plate of Qorqer that makes it truly special." },
];

function AboutPage() {
  const { siteName, image2 } = useAppContext();

  return (
    <section className="page-section about-page">
      <div className="page-section-bg" />
      <div className="page-container">
        <div className="page-header">
          <span className="section-badge">About</span>
          <h1 className="page-title">{siteName}</h1>
          <p className="page-subtitle">
            The story behind Ethiopia's beloved street snack
          </p>
        </div>

        <div className="about-stats">
          {[
            { to: 15, suffix: "+", label: "Years of Tradition" },
            { to: 100, suffix: "K+", label: "Daily Servings" },
            { to: 50, suffix: "+", label: "Street Stalls" },
          ].map((s, i) => (
            <RevealCard key={i} delay={i + 1}>
              <div className="stat-card card-glass">
                <CountUp to={s.to} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            </RevealCard>
          ))}
        </div>

        <div className="about-grid">
          {cards.map((card, i) => (
            <RevealCard key={i} delay={i + 1}>
              <div className="about-card card-glass">
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </RevealCard>
          ))}
        </div>

        <div className="about-image-section">
          <RevealCard delay={3}>
            <div className="about-image-wrapper">
              <div className="about-image-glow" />
              <img src={image2} alt="Qorqer" className="about-feature-img" />
            </div>
          </RevealCard>
          <RevealCard delay={4}>
            <div className="about-quote card-glass">
              <span className="quote-mark">"</span>
              <p>
                Qorqer is not just food — it's a feeling. It's the laughter of
                friends, the warmth of morning, and the taste of home.
              </p>
              <span className="quote-author">— Addis Qorqer</span>
            </div>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
