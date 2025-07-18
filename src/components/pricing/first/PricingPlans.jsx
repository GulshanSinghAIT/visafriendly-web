import React from "react";
import styles from "./PricingPlans.module.css";
import PricingCard from "./PricingCard";
import { useState } from "react";

const pricingData = [
  {
    title: "Free",
    price: "$0",
    buttonText: "Current Plan",
    buttonVariant: "current",
  },
  {
    title: "VisaFriendly Plus",
    price: "$9.99",
    priceSubtext: " per month",
    buttonText: "Get Started",
  },
  {
    title: "Premium",
    price: "$24.99",
    priceSubtext: " for 3 months",
    buttonText: "Get Started",
    buttonVariant: "primary",
    badge: "Save 20%",
    recommendedBadge: true,
   
  },
  {
    title: "Premium",
    price: "$35.99",
    priceSubtext: " for 6 months",
    buttonText: "Get Started",
    badge: "Save 30%",
    highlighted: true,
    recommendedBadge: false,
  },
];

export default function PricingPlans() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveCardIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Pricing Plans</h1>
        <div className={styles.cardsContainer}>
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              // recommendedBadge={true}
              onClick={() => handleCardClick(index)}
              isHighlighted={activeCardIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
