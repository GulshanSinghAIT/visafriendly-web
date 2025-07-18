import React from "react";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { testimonials } from "./testimonials";
import { useState, useEffect } from "react";
import "./TestimonialsSection.css";

const reviews = [
  {
    title: "Amazing experience",
    text: "Visa Friendly made my visa application process incredibly simple and stress-free! I was overwhelmed by the requirements.",
    rating: 4.5,
    name: "Venkata Mani Babu",
    date: "Nov 12, 2024",
  },
  {
    title: "Excellent experience",
    text: "Visa Friendly made my visa application process incredibly simple and stress-free! I was overwhelmed by the requirements.",
    rating: 4.5,
    name: "Venkata Mani Babu",
    date: "Nov 12, 2024",
  },
  {
    title: "Overall seamless experience",
    text: "Visa Friendly made my visa application process incredibly simple and stress-free! I was overwhelmed by the requirements.",
    rating: 4.5,
    name: "Venkata Mani Babu",
    date: "Nov 12, 2024",
  },
  {
    title: "Gain lots of insights",
    text: "Visa Friendly made my visa application process incredibly simple and stress-free! I was overwhelmed by the requirements.",
    rating: 4.5,
    name: "Venkata Mani Babu",
    date: "Nov 12, 2024",
  },
  {
    title: "The best one",
    text: "Visa Friendly made my visa application process incredibly simple and stress-free! I was overwhelmed by the requirements.",
    rating: 4.5,
    name: "Venkata Mani Babu",
    date: "Nov 12, 2024",
  },
];

export const TestimonialsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="section" aria-label="Customer Testimonials">
      <div className="containerTest">
        <header className="testimonialHeader ">
          <h2 className="testimonialTitle py-2">
          From Visa Worries to Career Wins - Hear Their Stories.
          </h2>
          <span className="testimonialSubtitle py-2">
          Read what international students and professionals say after using VisaFriendly.
          </span>
        </header>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
      <div className="reviews">
        <div className="reviews-section">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-rating">
                {"★".repeat(Math.floor(review.rating))}
                <span className="rating-number">{review.rating}</span>
              </div>
              <h3 className="review-title">{review.title}</h3>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <p className="review-name">{review.name}</p>
                <p className="review-date">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-section">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-rating">
                {"★".repeat(Math.floor(review.rating))}
                <span className="rating-number">{review.rating}</span>
              </div>
              <h3 className="review-title">{review.title}</h3>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <p className="review-name">{review.name}</p>
                <p className="review-date">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
