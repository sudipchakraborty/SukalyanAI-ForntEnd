import { useEffect, useState } from "react";
import { carouselSlides } from "../config/carouselConfig";
import { carouselSettings } from "../config/carouselSettings";

import "./Carousel.css";

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % carouselSlides.length
      );
    }, carouselSettings.interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      {carouselSlides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${carouselSettings.effect} ${
            index === current ? "active" : ""
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          <div className="carousel-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carousel;