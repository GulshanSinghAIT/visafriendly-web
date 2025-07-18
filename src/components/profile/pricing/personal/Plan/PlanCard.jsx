"use client";
import React, { useState, useEffect } from "react";
import styles from "./PlanCard.module.css";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const PlanCard = () => {
  const { user, isSignedIn } = useUser();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!isSignedIn || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/pricing/current-plan`,
          {
            params: {
              email: user.emailAddresses[0].emailAddress,
            },
          }
        );

        setCurrentPlan(response.data.plan);
      } catch (err) {
        console.error("Error fetching current plan:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentPlan();
  }, [isSignedIn, user]);

  if (isLoading) {
    return (
      <article className={styles.planCard}>
        <div>Loading plan details...</div>
      </article>
    );
  }

  if (error || !currentPlan) {
    return (
      <article className={styles.planCard}>
        {/* <header className={styles.header}>
          <h1 className={styles.currentPlan}>No Active Plan</h1>
        </header>
        <section className={styles.planDetails}>
          <div className={styles.planInfo}>
            <div className={styles.planInfoContent}>
              <h2 className={styles.planName}>Free Plan</h2>
              <p className={styles.planFeatures}>Basic features available</p>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.upgradeSection}>
            <p className={styles.upgradeMessage}>Unlock more features</p>
            <Link to="/profile/upgradePlan" className={styles.upgradeButton}>
              Upgrade Plan
            </Link>
          </div>
        </footer> */}
      </article>
    );
  }

  return (
    <article className={styles.planCard}>
      <header className={styles.header}>
        <h1 className={styles.currentPlan}>Current Plan</h1>
      </header>

      <section className={styles.planDetails}>
        <div className={styles.planInfo}>
          <div className={styles.planInfoContent}>
            <h2 className={styles.planName}>{currentPlan.planName}</h2>
            <p className={styles.planFeatures}>
              {currentPlan.basicDescription || "No description available"}
            </p>
          </div>
        </div>

        <div className={styles.validityInfo}>
          <p className={styles.validityDate}>
            {`Active For ${
              currentPlan.billingCycle !== 0
                ? currentPlan.billingCycle
                : "Lifetime"
            } ${
              currentPlan.id !== 1
                ? `month${currentPlan.billingCycle !== 1 ? "s" : ""}`
                : ""
            }`}
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.upgradeSection}>
          <p className={styles.upgradeMessage}>Unlock more features</p>
          <Link to="/profile/upgradePlan" className={styles.upgradeButton}>
            Upgrade Plan
          </Link>
        </div>
      </footer>
    </article>
  );
};
