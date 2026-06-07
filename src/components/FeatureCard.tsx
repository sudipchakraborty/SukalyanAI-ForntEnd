import "./FeatureCard.css";

interface FeatureCardProps {
  title: string;
  image: string;
  description: string;
  url: string;
}

function FeatureCard({
  title,
  image,
  description,
  url,
}: FeatureCardProps) {
  return (
    <div
      className="feature-card"
      onClick={() => (window.location.href = url)}
    >
      <img src={image} alt={title} />

      <div className="card-content">
        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;