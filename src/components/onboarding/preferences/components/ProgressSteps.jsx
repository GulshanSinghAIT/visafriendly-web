import React from "react";
import styles from "./ProgressSteps.module.css";

export const ProgressSteps = ({ steps, currentPage }) => {
  const updatedSteps = steps.map((step, index) => {
    if (step.id === currentPage) {
      return {
        ...step,
        isCompleted: true,
        isCompletedSecond: false,
        isActive: true,
        circleColor: false,
      };
    } else if (step.id < currentPage) {
      return {
        ...step,
        isCompleted: true,
        isCompletedSecond: true,
        isActive: true,
        circleColor: true,
      };
    } else {
      return {
        ...step,
        isCompleted: false,
        isCompletedSecond: false,
        isActive: false,
        circleColor: false,
      };
    }
  });

  return (
    <div className={styles.stepsContainer}>
      {updatedSteps.map((step, index) => (
        <div key={step.id} className={styles.stepWrapper}>
          <div className={styles.stepIndicator}>
            {index > 0 && (
              <div
                className={`${styles.line} ${step.isCompleted ? styles.completed : ""}`}
                aria-hidden="true"
              />
            )}
            <div
              className={`${styles.circle} ${
                step.isActive ? styles.active : ""
              } ${step.circleColor ? styles.completed : ""}`}
              role="progressbar"
              aria-valuenow={step.id}
              aria-valuemin="1"
              aria-valuemax={steps.length}
              tabIndex={0}
            >
              {step.id}
            </div>
            {index < updatedSteps.length - 1 && (
              <div
                className={`${styles.line} ${step.isCompletedSecond ? styles.completed : ""}`}
                aria-hidden="true"
              />
            )}
          </div>
          <div
            className={`${styles.stepTitle} ${
              step.isActive ? styles.activeTitle : ""
            } ${step.circleColor ? styles.completedTitle : ""}`}
          >
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};
