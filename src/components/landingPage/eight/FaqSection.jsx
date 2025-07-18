import React from "react";
import styles from "./FaqSection.module.css";
import { FaqItem } from "./FaqItem";
import { faqData } from "./faqData";

export function FaqSection() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
          Top Questions, Clear Answers
          </h1>
          <h2 className={styles.subtitle}>Everything you need to know about the platform, job listings, membership, and how VisaFriendly works - all in one place.</h2>
        </header>
        <div
          className={styles.faqList}
          role="list"
          aria-label="Frequently Asked Questions"
        >
          {faqData.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
