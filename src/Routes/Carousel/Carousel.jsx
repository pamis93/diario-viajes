import React, { useState, useEffect } from "react";
import "./Carousel.css";

const carouselData = [
  {
    title: "Explorar el mundo",
    description: "Descubre nuevos destinos y vive aventuras únicas.",
  },
  {
    title: "Crea tu diario",
    description: "Guarda recuerdos de tus viajes y comparte experiencias.",
  },
  {
    title: "Comparte con amigos",
    description: "Inspira a otros viajeros con tus historias.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval); 
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <h2>{carouselData[currentIndex].title}</h2>
        <p>{carouselData[currentIndex].description}</p>
      </div>

      {/* Flechas */}
      <button className="carousel-arrow left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-arrow right-arrow" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {carouselData.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;