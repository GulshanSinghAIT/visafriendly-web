import React, { useState } from "react";
import styles from "./PricingCard.module.css";
import Feature from "./Feature";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

// Payment links configuration
const PAYMENT_LINKS = {
  monthly: `https://test.checkout.dodopayments.com/buy/${process.env.REACT_APP_DODO_ONE_MONTH_PRODUCT_ID}?quantity=1&redirect_url=http://localhost:3000/profile/subscription?id=2`,
  quarterly: `https://test.checkout.dodopayments.com/buy/${process.env.REACT_APP_DODO_THREE_MONTH_PRODUCT_ID}?quantity=1&redirect_url=http://localhost:3000/profile/subscription?id=3`,
  biannual: `https://test.checkout.dodopayments.com/buy/${process.env.REACT_APP_DODO_SIX_MONTH_PRODUCT_ID}?quantity=1&redirect_url=http://localhost:3000/profile/subscription?id=4`,
};

export default function PricingCard({
  title,
  price,
  priceSubtext,
  features,
  buttonText,
  buttonVariant = "secondary",
  highlighted = false,
  badge,
  recommendedBadge = false,
  onClick,
  isHighlighted,
  planType,
  planId, // Add planId to identify the specific plan
}) {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscription = async () => {
    if (!isSignedIn) {
      window.location.href = "/login";
      return;
    }

    try {
      setIsProcessing(true);

      // If it's a free plan, directly create subscription
      if (planType === "FREE") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/pricing/create-free-subscription`,
          {
            userId: user.id,
            planId: planId,
          }
        );
        return;
      }

      // For paid plans, redirect to predefined payment link
      const paymentLink = PAYMENT_LINKS[planType];

      if (!paymentLink) {
        throw new Error("Invalid plan type");
      }

      // Before redirecting, save initial payment intent
              // await axios.post(`${process.env.REACT_APP_API_URL}/pricing/create-payment-intent`, {
      //   email: email,
      //   planId: planId,
      //   planType: planType,
      //   amount: price,
      //   status: "PENDING",
      // });

      // Redirect to payment link
      window.location.href = paymentLink;
    } catch (error) {
      console.error("Subscription error:", error);
      alert(
        "Failed to process subscription: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`${styles.card} ${
        isHighlighted ? styles.cardHighlighted : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.titleWrapper}>
        {recommendedBadge && (
          <div className={styles.recommendedBadge}>Recommended</div>
        )}
        <span className={styles.title}>{title}</span>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.price}>
        {price}
        {priceSubtext && (
          <span className={styles.priceSubtext}>{priceSubtext}</span>
        )}
      </div>

      <button
        className={`${
          styles[
            `button${
              buttonVariant.charAt(0).toUpperCase() + buttonVariant.slice(1)
            }`
          ]
        } ${isProcessing ? styles.processing : ""}`}
        onClick={handleSubscription}
        disabled={isProcessing || buttonVariant === "current"}
      >
        {isProcessing ? "Processing..." : buttonText}
      </button>

      <div className={styles.features}>
        <div className={styles.featuresTitle}>What's included?</div>
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <Feature
              key={index}
              text={feature.text}
              icon={feature.icon}
              multiline={feature.multiline}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
