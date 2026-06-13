import "./Card_Middle_Home.css";
import FeatureCard from "./FeatureCard";
import { pageConfig } from "../config/featuresConfig";
import Carousel from "./Carousel";
import ContactForm from "./ContactForm";

function Card_Middle_Home() {
  return (
    <div className="landing-container">
      {/* Hero Banner */}
      <Carousel />
      {/* Feature Section */}

      <section className="feature-section">
        <h2>Our Solutions</h2>

        <div
          className="feature-grid"
          style={{
            gridTemplateColumns: `repeat(${pageConfig.columns}, minmax(0, 1fr))`,
          }}
        >
          {pageConfig.cards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              image={card.image}
              description={card.description}
              url={card.url}
            />
          ))}
        </div>
      </section>
       <ContactForm />
    </div>
  );
}

export default Card_Middle_Home;