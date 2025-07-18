import { React, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { categories } from "./data";
import styles from "./JobCategories.module.css";
import { useNavigate } from "react-router-dom";
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";
import { useUser } from "@clerk/clerk-react";

export function JobCategories() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Explore Jobs by Category 
        </h1>
        <button
          className={styles.browseButton}
          onClick={() => setIsModalOpen(true)}
        >
          Browse All Job Categories →
        </button>
      </div>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            icon={category.icon}
            iconAlt={category.iconAlt}
          />
        ))}
      </div>
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
