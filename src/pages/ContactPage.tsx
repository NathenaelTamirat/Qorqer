import { useState } from "react";
import { useInView } from "../hooks/useInView";

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  const cls = `reveal ${inView ? "reveal--visible" : ""} ${delay > 0 ? `reveal-delay-${delay}` : ""} ${className}`;
  return <div ref={ref} className={cls}>{children}</div>;
}

function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="page-section contact-page">
      <div className="page-section-bg" />
      <div className="page-container">
        <div className="page-header">
          <span className="section-badge contact-badge">Contact</span>
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>

        <div className="contact-grid">
          <RevealSection className="contact-info card-glass" delay={1}>
            <h3>Let's Talk Qorqer</h3>
            <p>
              Got a question, a story, or just craving some Qorqer? Drop us a
              message. We'd love to connect with fellow Qorqer enthusiasts!
            </p>

            <div className="contact-details">
              {[
                { icon: "📍", label: "Location", value: "Addis Ababa, Ethiopia" },
                { icon: "📧", label: "Email", value: "hello@adissqorqer.com" },
                { icon: "📱", label: "Phone", value: "+251 91 123 4567" },
              ].map((item) => (
                <div key={item.label} className="contact-item">
                  <span className="contact-item-icon">{item.icon}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              {["Instagram", "TikTok", "Telegram"].map((s) => (
                <span key={s} className="social-pill">{s}</span>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="contact-form-wrapper card-glass" delay={2}>
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">✓</span>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out! We'll get back to you as soon as
                  possible. In the meantime, go grab some Qorqer!
                </p>
                <button
                  className="btn-more"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", message: "" });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send us a Message</h3>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your Qorqer experience..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-more btn-submit">
                  Send Message →
                </button>
              </form>
            )}
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
