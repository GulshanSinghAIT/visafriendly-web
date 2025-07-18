import React, { useState } from "react";
import "./FaqItem.css";

export function FaqItem({ qId, isOpen, setIsOpen, question, answer }) {
  const questionId = question.replace(/\s+/g, "-").toLowerCase();

  const toggleAnswer = () => {
    const newOpen = isOpen.map((stat, i) => {
      if (i === qId) {
        return !stat;
      } else {
        return false;
      }
    });
    setIsOpen(newOpen);
  };

  return (
    <div className="faqItem" role="listitem">
      <div className="questionContainer">
        <h3 className="question" id={`question-${questionId}`}>
          {question}
        </h3>
        <button
          className="iconButton"
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
            className="faqIcon"
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
        className="answer"
        aria-hidden={!isOpen[qId]}
        role="region"
        aria-labelledby={`question-${questionId}`}
      >
        {answer}
      </div>
    </div>
  );
}
