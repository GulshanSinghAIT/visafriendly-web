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
    planType: "free",
    features: [
      {
        text: "Unlimited H-1B Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Application Tracker with multiple resume support",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
      {
        text: "Unlimited Cap-Exempt Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Analytics Dashboard",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Follow-up Alert System",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
    ],
  },
  {
    title: "Premium",
    price: "$9.99",
    priceSubtext: " per month",
    buttonText: "Get Started",
    planType: "monthly",
    features: [
      {
        text: "Unlimited H-1B Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Application Tracker with multiple resume support",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
      {
        text: "Unlimited Cap-Exempt Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Analytics Dashboard",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Follow-up Alert System",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Email Job Alerts",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Personalized Job Recommendation",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Regular Updates on Hiring Trends and Events",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
    ],
  },
  {
    title: "Premium",
    price: "$24.99",
    priceSubtext: " for 3 months",
    buttonText: "Get Started",
    buttonVariant: "primary",
    badge: "Save 20%",
    recommendedBadge: true,
    planType: "quarterly",
    features: [
      {
        text: "Unlimited H-1B Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Application Tracker with multiple resume support",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
      {
        text: "Unlimited Cap-Exempt Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Analytics Dashboard",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Follow-up Alert System",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Email Job Alerts",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Personalized Job Recommendation",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Regular Updates on Hiring Trends and Events",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
    ],
  },
  {
    title: "Premium",
    price: "$35.99",
    priceSubtext: " for 6 months",
    buttonText: "Get Started",
    badge: "Save 30%",
    planType: "biannual",
    highlighted: true,
    recommendedBadge: false,
    features: [
      {
        text: "Unlimited H-1B Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Application Tracker with multiple resume support",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
      {
        text: "Unlimited Cap-Exempt Jobs",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Analytics Dashboard",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Follow-up Alert System",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Email Job Alerts",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Personalized Job Recommendation",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
      },
      {
        text: "Regular Updates on Hiring Trends and Events",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/500df560cd7b19f54f08d75af02aff5ad1aded1a4912589e66d47c58127079f3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
        multiline: true,
      },
    ],
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
              onClick={() => handleCardClick(index)}
              isHighlighted={activeCardIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
