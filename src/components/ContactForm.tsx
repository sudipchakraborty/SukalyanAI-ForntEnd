import "./ContactForm.css";

function ContactForm() {
  return (
    <section id="contact" className="contact-section">

      <div className="contact-container">

        {/* Left Side */}

        <div className="contact-info">

          <h2>Let's Build Something Amazing</h2>

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

        {/* Right Side */}

        <form className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="text"
            placeholder="Company Name"
          />

          <select>
            <option>
              Select Service
            </option>

            <option>
              Home Automation
            </option>

            <option>
              Factory Automation
            </option>

            <option>
              Healthcare AI
            </option>

            <option>
              MQTT Cloud
            </option>

            <option>
              Blockchain + IoT
            </option>
          </select>

          <textarea
            rows={6}
            placeholder="Tell us about your project..."
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default ContactForm;

