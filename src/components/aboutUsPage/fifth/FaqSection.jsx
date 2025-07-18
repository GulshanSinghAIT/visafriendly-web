import React from "react";
import styles from "./FaqSection.css";
import  { useState } from "react";

import { FaqItem } from "./FaqItem";
import { faqData } from "./faqData";

export function FaqSection() {
  const [isOpen, setIsOpen] = useState([false,false,false]);
  return (
    <div className="videoSec">
      <div className="about-container">
        <div className="infoSectionFive">
          <h2 className="infoTitleFive">About VisaFriendly</h2>
          <h1 className="mainTitleFive">
            Breaking Barriers, Building Careers: Your Global Job Search Simplified
          </h1>
          <p className="description">
            At VisaFriendly, we specialize in connecting H-1B visa holders with companies that value global talent. Our platform simplifies the job search by offering verified listings, tailored roles, and insights into visa sponsorship.
          </p>
          <button className="contact-button">Contact Us</button>
        </div>
        <div
          className="faqList"
          role="list"
          aria-label="Frequently Asked Questions"
        >
          {faqData.map((faq,index) => (
            <FaqItem qId={index} isOpen={isOpen} setIsOpen={setIsOpen} key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <div className="video-section">
        <iframe className="video" src="https://www.youtube.com/embed/F96T0_M-078?si=QQbFADhLML_cv2Mw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      </div>
  );
}
