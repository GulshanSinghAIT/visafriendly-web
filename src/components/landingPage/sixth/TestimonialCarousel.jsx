import React, { useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
import styles from "./TestimonialCarousel.module.css";

export const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let testimonialLeft =
    testimonials[
      (currentIndex - 1 + testimonials.length) % testimonials.length
    ];
  let testimonialMid = testimonials[currentIndex];
  let testimonialRight = testimonials[(currentIndex + 1) % testimonials.length];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? testimonials.length - 1 : prevIndex - 1
    );
    testimonialLeft =
      testimonials[
        (currentIndex - 1 + testimonials.length) % testimonials.length
      ];
    testimonialMid = testimonials[currentIndex];
    testimonialRight = testimonials[(currentIndex + 1) % testimonials.length];
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
    testimonialLeft =
      testimonials[
        (currentIndex - 1 + testimonials.length) % testimonials.length
      ];
    testimonialMid = testimonials[currentIndex];
    testimonialRight = testimonials[(currentIndex + 1) % testimonials.length];
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div key={testimonialLeft.id} className={styles.carouselSlideLeft}>
          <TestimonialCard {...testimonialLeft} />
        </div>
        <div key={testimonialMid.id} className={styles.carouselSlideMid}>
          <TestimonialCard {...testimonialMid} />
          <div className={styles.carouselControls}>
            <button
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              ←
            </button>
          </div>
          <div className={styles.carouselControlsi}>
            <button
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
        <div key={testimonialRight.id} className={styles.carouselSlideRight}>
          <TestimonialCard {...testimonialRight} />
        </div>
      </div>
    </div>
  );
};
