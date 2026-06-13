import "./ContactForm.css";
import { useState } from "react";
import { sendContactEmail } from "../services/emailService";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus("");

      const result =
        await sendContactEmail(formData);

      if (result.success) {

        setStatus(
          "✅ Message sent successfully."
        );

        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });

      } else {

        setStatus(
          result.message ||
          "❌ Failed to send message."
        );
      }

    } catch (error) {

      setStatus(
        "❌ Unable to connect to backend."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-container">

        <div className="contact-info">

          <h2>
            Let's Build Something Amazing
          </h2>

          <p>
            Have an idea for Home Automation,
            Factory Automation, Healthcare AI,
            MQTT Cloud or Blockchain Solutions?
          </p>

          <div className="info-item">
            📧 contact@sukalyanai.com
          </div>

          <div className="info-item">
            🌐 www.sukalyanai.com
          </div>

          <div className="info-item">
            📍 India
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
             Select Service
            </option>

            <option value="Home Automation">
              Home Automation
            </option>

            <option value="Factory Automation">
              Factory Automation
            </option>

            <option value="Healthcare AI">
              Healthcare AI
            </option>

            <option value="MQTT Cloud">
              MQTT Cloud
            </option>

            <option value="Blockchain + IoT">
              Blockchain + IoT
            </option>
          </select>

          <textarea
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Sending..."
                : "Send Message"
            }
          </button>

          {
            status &&
            (
              <div
                className="form-status"
                style={{
                  marginTop: "15px",
                  color: "white"
                }}
              >
                {status}
              </div>
            )
          }

        </form>

      </div>
    </section>
  );
}
export default ContactForm;