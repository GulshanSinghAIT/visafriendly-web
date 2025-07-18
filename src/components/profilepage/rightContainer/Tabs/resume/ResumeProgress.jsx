"use client";
import React from "react";
import styles from "./ResumeProgress.module.css";

const ResumeProgress = ({ savedResumes = 0, totalResumes = 5 }) => {
  const calculateProgress = () => {
    const progress = (savedResumes / totalResumes) * 360;
    return `rotate(${progress - 75}deg)`; // Starts from 12 o’clock
  };

  return (
    <section className=" flex justify-center items-center gap-2">
      <div className={styles.circularProgress}>
        <div className={styles.progressBackground} />
        <div
          className={styles.progressArc}
          style={{
            clipPath:
              savedResumes === 1
                ? "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" // Start at 12 o’clock
                : savedResumes === 2
                ? "polygon(50% 0, 100% 15%, 100% 100%, 50% 50%)" // Covers from 12 to 5 o’clock
                : savedResumes === 3
                ? "polygon(50% 0%, 90% 50%, 75% 100%, 0% 100%, 60% 40%, 70% 60%)" // Covers from 12 to 8 o’clock
                : savedResumes === 4
                ? "polygon(50% 0, 90% 50%, 75% 100%, 0% 100%, 0% 40%, 70% 60%)" // Covers from 12 to 10 o’clock
                : savedResumes === 5
                ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" // Full cover
                : "inset(0 50% 0 0)",
            transformOrigin: "center",
            backgroundColor: "#313deb",
            visibility: savedResumes > 0 ? "visible" : "hidden",
          }}
        />

        {savedResumes >= 3 && (
          <div
            className={styles.progressArcFull}
            style={{
              clipPath: "polygon(50% 0, 100% 0%, 100% 100%, 50% 100%)",
              backgroundColor: "#313deb",
              visibility: "visible",
            }}
          />
        )}
      </div>
      <p className={styles.progressText}>
        You have saved {savedResumes} out of {totalResumes} resumes
      </p>
    </section>
  );
};

export default ResumeProgress;
