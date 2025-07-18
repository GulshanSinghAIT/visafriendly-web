import React from "react";
import styles from "./PricingCard.module.css";
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {Star} from 'lucide-react'
import axios from "axios";

export default function PricingCard({
  title,
  price,
  priceSubtext,
  buttonText,
  buttonVariant = "secondary",
  highlighted = false,
  badge,
  Bestbadge,
  discription,
  onClick,
  isHighlighted,
  dodoProductId,
  planName,
}) {
  const { isSignedIn, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handle payment processing with Dodo Payments
   */
  const handlePayment = async () => {
    if (!isSignedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      setIsProcessing(true);

      // Extract price amount (remove $ symbol and convert to number)
      const amount = parseFloat(price.replace('$', ''));
      
      // Prepare payment data
      const paymentData = {
        email: user.emailAddresses[0].emailAddress,
        dodoProductId: dodoProductId,
        planName: planName,
        amount: amount.toString(),
        redirectUrl: `${window.location.origin}/profile/subscription?id=${dodoProductId}`,
      };

      // Create payment intent with Dodo Payments
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pricing/create-payment-intent`,
        paymentData
      );

      // Redirect to Dodo Payments checkout
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Payment failed: " + 
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
      } relative flex flex-col justify-between`}
      onClick={onClick}
    >
      {Bestbadge && <span className=" bg-[#313DEB] text-white px-4 py-1 rounded-full text-sm absolute -top-4 left-1/2 translate-x-[-50%] flex items-center gap-2"><Star color="#fff" fill="#fff"  size={16}/>{Bestbadge}</span>}
      <div className=" mb-8">
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>

        <div className={styles.price}>
          {price}
          {priceSubtext && (
            <span className=" text-[#545251] text-xl font-medium ml-3">{priceSubtext}</span>
          )}
        </div>
        {discription && <span className=" text-[#545251] text-sm my-2">{discription}</span>}
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={
          styles[
            `button${
              buttonVariant.charAt(0).toUpperCase() + buttonVariant.slice(1)
            }`
          ]
        }
        aria-label={`Select ${title} plan`}
      >
        {isProcessing ? "Processing..." : buttonText}
      </button>

      {/* Modal Overlay */}
      {isModalOpen && !isSignedIn && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <OpportunityModal
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
