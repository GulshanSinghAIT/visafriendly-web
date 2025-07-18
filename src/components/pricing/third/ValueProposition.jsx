"use client";
import React from "react";
import styles from "./ValueProposition.module.css";
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
const ValueProposition = () => {
  const { isSignedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}> Invest in Your Career, Not Just Coffee</h1>
        <p className={styles.subtitle}>It's more than subscription - it's your shortcut to job offers, visa sponsorships, and long-term success.
        </p>
      </header>

      <div className={styles.cardSection}>
        <article className={styles.comparisonCard}>
          <h2 className={styles.cardTitle}>What's $9.99 Anyway</h2>
          <p className={styles.cardSubtitle}>
          Discover how a small spend unlocks big opportunities
          </p>
          <ul className={styles.comparisonList}>
            <div className={styles.comparisonItemWrapper}>
            <li className={styles.comparisonItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e206f6bce2b266dd55635181579f26dc4ec5ec18395a77f79b3f146cf41c738"
                alt=""
                className={styles.icon}
              />
              <span>One movie night = $20</span>
            </li>
            <li className={styles.comparisonItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5f7c93a1e40828c233bdd5d0068f3c7b9facf1968b2346e242935ec36a9c805"
                alt=""
                className={styles.icon}
              />
              <span>A weekend trip = $300.</span>
            </li>
            <li className={styles.comparisonItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/35e85023821011bc0967f8ba005bc3e6aa6e3bdfaf1e4ab4f038fdf2e68a65c7"
                alt=""
                className={styles.icon}
              />
              <span>Two Cafe Coffees = $12</span>
            </li>
          </div>
          </ul>
        </article>

        <article className={styles.benefitsCard}>
          <h2 className={styles.cardTitle}>Why Visa Friendly</h2>
          <p className={styles.cardSubtitle}>
          Turn $9.99 into thousands in career value
          </p>
          <ul className={styles.benefitsList}>
            <div className={styles.benefitsItemWrapper}>
            <li className={styles.benefitsItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/03089281e7bdcb82370e426b4840e507cb0061235c02fb1e01d156bdde4e8b5b"
                alt=""
                className={styles.icon}
              />
              <span>3x more interview calls</span>
            </li>
            <li className={styles.benefitsItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b24de5dd7cd19e0e3b7181c25de7fb274745c654f0fc208d3ed216597972749"
                alt=""
                className={styles.icon}
              />
              <span>Cut job search time from 6 to 2-3 months</span>
            </li>
            <li className={styles.benefitsItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca87c0bc57d90c15fb3dc44c360dd607f37da956971d13e7f8ae9e83b4cba03b"
                alt=""
                className={styles.icon}
              />
              <span>Land a job worth $100k+</span>
            </li>
            </div>
          </ul>
        </article>
      </div>

      <footer className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>
        Skip the movie and invest in your future instead
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.ctaButton}
        >
          Start Now for $9.99
        </button>
      </footer>
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
    </section>
  );
};

export default ValueProposition;
