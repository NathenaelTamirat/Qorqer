import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contactVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 18, stiffness: 80, delay: 0.1 },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 50, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 18, stiffness: 80, delay: 0.3 },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, damping: 12, stiffness: 60 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

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
        <motion.div className="page-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span className="section-badge contact-badge">Contact</span>
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info card-glass"
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
          >
            <h3>Let's Talk Qoqer</h3>
            <p>
              Got a question, a story, or just craving some Qoqer? Drop us a
              message. We'd love to connect with fellow Qoqer enthusiasts!
            </p>

            <div className="contact-details">
              {[
                { icon: "📍", label: "Location", value: "Addis Ababa, Ethiopia" },
                { icon: "📧", label: "Email", value: "hello@adissqoqer.com" },
                { icon: "📱", label: "Phone", value: "+251 91 123 4567" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="contact-item"
                  whileHover={{ x: 6 }}
                >
                  <span className="contact-item-icon">{item.icon}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-social">
              {["Instagram", "TikTok", "Telegram"].map((s) => (
                <motion.span
                  key={s}
                  className="social-pill"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper card-glass"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.span
                    className="success-icon"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring" as const, damping: 10, stiffness: 80 }}
                  >
                    ✓
                  </motion.span>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out! We'll get back to you as soon as
                    possible. In the meantime, go grab some Qoqer!
                  </p>
                  <motion.button
                    className="btn-more"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3>Send us a Message</h3>
                  {[
                    { id: "name", label: "Your Name", type: "text", placeholder: "Enter your name" },
                    { id: "email", label: "Your Email", type: "email", placeholder: "Enter your email" },
                  ].map((field) => (
                    <div key={field.id} className="form-group">
                      <label htmlFor={field.id}>{field.label}</label>
                      <motion.input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <motion.textarea
                      id="message"
                      placeholder="Tell us about your Qoqer experience..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn-more btn-submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message →
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
