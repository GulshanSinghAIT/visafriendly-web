import React, { useState } from "react";
import styles from "./FaqItem.module.css";

export function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  const questionId = question.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className={styles.faqItem} role="listitem">
      <div className={styles.questionContainer}>
        <h3 className={styles.question} id={`question-${questionId}`}>
          {question}
        </h3>
        <button
          className={styles.iconButton}
          onClick={toggleAnswer}
          aria-expanded={isOpen}
          aria-controls={`answer-${questionId}`}
          aria-labelledby={`question-${questionId}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.faqIcon}
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        id={`answer-${questionId}`}
        className={styles.answer}
        aria-hidden={!isOpen}
        role="region"
        aria-labelledby={`question-${questionId}`}
      >
        {answer}
      </div>
    </div>
  );
}
