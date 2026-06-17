import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { TextScramble, Typewriter } from "../components/TextEffects";

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
      <div className="hero-inner">
        <h2>
          Welcome to{" "}
          <span className="highlight-green">
            <TextScramble text={siteName} delay={0.2} />
          </span>
        </h2>
        <p className="tagline">
          <Typewriter text={siteTagline} speed={45} />
        </p>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <img
            src={image2}
            alt="Qorqer Ethiopia"
            className="hero-main-img"
          />
        </div>

        <p className="hero-text">
          Try qorqer a boil cancer, made with chinese oil and plastic dough. its fun, fulfilling but not healthy
        </p>

        <button className="btn-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Learn More"}
        </button>

        {showMore && (
          <div className="more-info">
            <p>
              Fun fact: Qorqer is widely common eaten food among teenagers, youngesters and people in their 20's. it is one of the most enjoyable ethiopian food.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;
