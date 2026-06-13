import { useParams } from "react-router-dom";
import { productConfig } from "../config/productConfig";

import "./ProductPage.css";

function ProductPage() {

  const { slug } = useParams();

  const product =
    productConfig[slug || ""];

  if (!product)
    return <h1>Product Not Found</h1>;

  return (

    <div className="product-page">

      <section className="hero-section">

        <img
          src={product.image}
          alt={product.title}
          className="hero-image"
        />

        <div className="hero-overlay">

          <h1>{product.title}</h1>

          <h2>{product.tagline}</h2>

          <div className="hero-buttons">

            <button
              className="
              hero-btn
              primary-btn"
            >
              Request Demo
            </button>

            <button
              className="
              hero-btn
              secondary-btn"
            >
              Contact Us
            </button>

          </div>

        </div>

      </section>

      <section className="content-section">

        <h2 className="section-title">
          Overview
        </h2>

        <p>
          {product.description}
        </p>

      </section>

      <section className="content-section">

        <h2 className="section-title">
          Features
        </h2>

        <div className="feature-grid">

          {product.features.map(
            (item, index) => (

              <div
                key={index}
                className="info-card"
              >
                {item}
              </div>

            )
          )}

        </div>

      </section>

      <section className="content-section">

        <h2 className="section-title">
          Benefits
        </h2>

        <div className="benefit-grid">

          {product.benefits.map(
            (item, index) => (

              <div
                key={index}
                className="info-card"
              >
                {item}
              </div>

            )
          )}

        </div>

      </section>

      <section className="content-section">

        <h2 className="section-title">
          Use Cases
        </h2>

        <div className="usecase-grid">

          {product.useCases.map(
            (item, index) => (

              <div
                key={index}
                className="info-card"
              >
                {item}
              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}

export default ProductPage;