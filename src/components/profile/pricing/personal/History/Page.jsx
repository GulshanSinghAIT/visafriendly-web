import React, { useEffect, useState, useRef } from "react";
import { PaymentHistoryTable } from "./PaymentHistory.jsx";
import { Header } from "../../../header/Header.js";
import { PlanCard } from "../Plan/PlanCard.jsx";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Page.css";

export const Page = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const handledSubscription = useRef(false);

  // Function to clear query parameters
  const clearParams = () => {
    navigate(window.location.pathname, { replace: true });
  };

  // Extract parameters
  const id = searchParams.get("id");
  const subscription_id = searchParams.get("subscription_id");
  const status = searchParams.get("status");
  const email = user?.emailAddresses[0]?.emailAddress;

  // Handle subscription update
  const handleSubscription = async () => {
    // Prevent multiple simultaneous requests
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // Validate required parameters
      if (!status || !id || !email) {
        console.error("Missing required parameters");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pricing/updatePlans`,
        {
          status: status,
          id: id,
          email: email,
          paymentID: subscription_id,
        }
      );

      if (response.status === 200) {
        console.log("Subscription updated successfully");

        // Clear parameters and reload
        clearParams();

        // Optional: Show success message
        alert("Subscription updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Subscription error:", error);

      // Optional: Show error message
      alert("Failed to update subscription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Check if all required parameters are present
    if (status && subscription_id && !handledSubscription.current) {
      handledSubscription.current = true;
      handleSubscription();
    }
  }, [status, subscription_id]);

  return (
    <div className="root">
      <Header />

      {/* Optional: Show processing state */}
      {isProcessing && (
        <div className="processing-overlay">
          Processing your subscription...
        </div>
      )}

      <PlanCard />
      <PaymentHistoryTable />
    </div>
  );
};
