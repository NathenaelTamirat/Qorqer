import { useAppContext } from "../context/AppContext";

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

        <div className="about-grid">
          <div className="about-card card-glass">
            <div className="card-icon">🍳</div>
            <h3>What is Qorqer?</h3>
            <p>
              Qorqer is a traditional Ethiopian breakfast snack, especially
              popular among the youth. It's a unique street food made with
              simple ingredients, deep-fried to golden perfection, and enjoyed
              with a cup of traditional Ethiopian tea or coffee.
            </p>
          </div>

          <div className="about-card card-glass">
            <div className="card-icon">📖</div>
            <h3>Our Story</h3>
            <p>
              Adiss Qorqer started as a small street-side stall, serving the
              bustling morning crowds. What began as a humble venture quickly
              grew into a beloved brand known for quality, taste, and that
              unmistakable authentic flavor.
            </p>
          </div>

          <div className="about-card card-glass">
            <div className="card-icon">🌍</div>
            <h3>Cultural Roots</h3>
            <p>
              Deeply rooted in Ethiopian culinary tradition, Qorqer represents
              more than just food — it's a cultural experience. Every bite tells
              a story of community, resourcefulness, and the vibrant spirit of
              Ethiopian youth.
            </p>
          </div>

          <div className="about-card card-glass">
            <div className="card-icon">❤️</div>
            <h3>Made with Love</h3>
            <p>
              Despite the jokes about "chinese oil and plastic dough," every
              batch of Qorqer is made with dedication. It's the love and
              laughter shared over a plate of Qorqer that makes it truly
              special.
            </p>
          </div>
        </div>

        <div className="about-image-section">
          <div className="about-image-wrapper">
            <div className="about-image-glow" />
            <img src={image2} alt="Qorqer" className="about-feature-img" />
          </div>
          <div className="about-quote card-glass">
            <span className="quote-mark">"</span>
            <p>
              Qorqer is not just food — it's a feeling. It's the laughter of
              friends, the warmth of morning, and the taste of home.
            </p>
            <span className="quote-author">— Addis Qorqer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
