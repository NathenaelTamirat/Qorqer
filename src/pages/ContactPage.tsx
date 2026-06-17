import { useState } from "react";

function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
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
          <p className="page-subtitle">
            We'd love to hear from you
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info card-glass">
            <h3>Let's Talk Qorqer</h3>
            <p>
              Got a question, a story, or just craving some Qorqer? Drop us a
              message. We'd love to connect with fellow Qorqer enthusiasts!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-item-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@adissqorqer.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">📱</span>
                <div>
                  <strong>Phone</strong>
                  <p>+251 91 123 4567</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <span className="social-pill">Instagram</span>
              <span className="social-pill">TikTok</span>
              <span className="social-pill">Telegram</span>
            </div>
          </div>

          <div className="contact-form-wrapper card-glass">
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">✓</span>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out! We'll get back to you as soon as
                  possible. In the meantime, go grab some Qorqer!
                </p>
                <button
                  className="btn-primary"
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
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn-primary btn-submit">
                  Send Message
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
