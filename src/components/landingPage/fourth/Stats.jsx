import { React, useState } from "react";
import { useNavigate } from "react-router";
import { StatCard } from "./StatCard";
import styles from "./Stats.module.css";
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";
import { useUser } from "@clerk/clerk-react";

const statsData = [
  {
    percentage: "75%",
    title: "Employer Sponsorship",
    description: "Ninety percent of our members land interviews within 6 weeks",
  },
  {
    percentage: "90%",
    title: "Fewer visa-related rejections",
    description:
      "We pinpoint jobs offering visa sponsorship with high accuracy",
  },
  {
    percentage: "3X",
    title: "Job Applications",
    description: "Get matched with jobs tailored to your unique criteria",
  },
  {
    percentage: "50%",
    title: "less time spent in job searching",
    description:
      "We help reduce job search from 6 months to 2-3 months for F-1 and H-1B holders",
  },
  {
    percentage: "1000X",
    title: "Return on Investment",
    description:
      "Every month saved in job searching is a month of income gained.",
  },
];

export const Stats = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className={styles.statsSection}>
      <header className={styles.statsHeader}>
        <h1 className={styles.mainTitle}>
          Not Just Talk: Real Outcomes, Real Impact
        </h1>
        <p className={styles.subtitle}>
          Join over 100 people who've landed jobs that fit their goals
          perfectly. Be next!
        </p>
      </header>

      <div className={styles.statsContainer}>
        <div className={styles.topRow}>
          {statsData.slice(0, 3).map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <div className={styles.bottomRow}>
          {statsData.slice(3).map((stat, index) => (
            <StatCard key={index + 3} {...stat} />
          ))}
        </div>
      </div>

      <button className={styles.ctaButton} onClick={() => setIsModalOpen(true)}>
        <span className={styles.buttonText}>Get Hired Faster</span>
        <img
          src={`https://cdn.builder.io/api/v1/image/assets/TEMP/76cbc8a7a231fa094927059d640e4584ea4cb15b687c89a0e117d46ded48e7c5?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
          alt=""
          className={styles.buttonIcon}
        />
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
    </section>
  );
};
