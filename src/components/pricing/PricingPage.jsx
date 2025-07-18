import PricingCard from "./first/PricingCard";
import { useState } from "react";
import styles from "./PricingPage.module.css";
import WhySubscribe from "./second/WhySubscribe";
import ValueProposition from "./third/ValueProposition";
import { FaqSection } from "../landingPage/eight/FaqSection";
import { Footer } from "../landingPage/ninth/Footer";
import Benifits from "./Benifits/Benifits";
import { NavBarrr } from "../Navbar/NavBar";

const pricingData = [
  {
    title: "VisaFriendly Plus",
    price: "$9.99",
    priceSubtext: "/ per month",
    buttonText: "Get Started",
    dodoProductId: "pdt_gXXT6AXOHrLRiuV3efghJ", // Replace with your actual Dodo product ID
    planName: "Plus for 1 Month",
  },
  {
    title: "2 Months Plan",
    price: "$7.99",
    priceSubtext: "/ per month",
    buttonText: "Get Started",
    buttonVariant: "primary",
    badge: "Save 20%",
    discription: "Billed as $15.98 every 2 months ",
    dodoProductId: "pdt_6RuL6zJsB358bReAL7xlJ", // Replace with your actual Dodo product ID
    planName: "Plus for 2 Months",
  },
  {
    title: "3 Months Plan",
    price: "$6.99",
    priceSubtext: "/ per month",
    buttonText: "Get Started",
    badge: "Save 30%",
    Bestbadge:"Best Value",
    discription: "Billed as $20.97 every 3 months ",
    highlighted: true,
    recommendedBadge: true,
    dodoProductId: "pdt_JJYvpfA4n7LjIUwhf9DJi", // Replace with your actual Dodo product ID
    planName: "Plus for 3 Months",
  },
];

export const PricingPage = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveCardIndex(index);
  };
  
  return (
    <div className={styles.root}>
      <NavBarrr />
      <div className={styles.container}>
        <div>
          <h1>VisaFriendly Plus Users Land 3x More Interviews</h1>
          <p className="text-[#545251] py-2 text-lg text-center">
            Members who upgrade to Plus see a significant increase in interview calls — thanks to targeted matches, follow-ups, and real sponsor-backed roles.
          </p>
        </div>
        <div className={styles.cardsContainer}>
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onClick={() => handleCardClick(index)}
              isHighlighted={activeCardIndex === index}
            />
          ))}
        </div>
        <Benifits />
        <WhySubscribe />
        <ValueProposition />
        <FaqSection />
      </div>
      <Footer />
    </div>
  );
};
