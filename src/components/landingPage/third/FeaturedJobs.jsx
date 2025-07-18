import React from "react";
import { useState } from "react";
import { JobCard } from "./JobCard";
import styles from "./FeaturedJobs.module.css";
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";
import { useUser } from "@clerk/clerk-react";

const jobsData = [
  {
    title: "Data Analyst",
    type: "H-1B Job",
    location: "Seattle, WA",
    salary: "$95,000/year",
    schedule: "Full Time",
    tags: ["Internship", "H-1B", "+2"],
    company: "Infosys Limited",
    logo: `/images/c_logo.png`,
    postedDate: "10 days ago",
    bookmarkIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/9cd71d167930d9a1e1fccb74c58bf8081cee9b50709154e807be4bca0becc89c?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    locationIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/2690dbd95e2a7808c27f446bafa8ab56a0e9204af91a789c3ce68475360d2054?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    salaryIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/8c97b12c45e6ea8bea5ef8d0cdccb11bae0de99a6bb65b2c5fde90b775804a6a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    scheduleIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/02526268e652ea3b55dfb8ce90232185e615b5999002a9e7967073a8871bbd79?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    timeIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/549b5e9de63155135a1b1ca5fcdfc5a1f032bbb2a2b5314cd29e2eece4c6ff5b?placeholderIfAbsent=true&apiKey=`,
  },
  {
    title: "Data Analyst",
    type: "H-1B Job",
    location: "Seattle, WA",
    salary: "$95,000/year",
    schedule: "Full Time",
    tags: ["Internship", "H-1B", "+2"],
    company: "Infosys Limited",
    logo: `/images/c_logo.png`,
    postedDate: "10 days ago",
    bookmarkIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/68fd19626fbd3e567bc3ae38a2038a399f579a8cdfc8c41da844c0ad7a974c13?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    locationIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/5e5799f2b54bac5fc445e6dced732f20cff26ed74c8a2f6a0b1c4af03bdb49cb?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    salaryIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/7b5d32037f5f9c04447a5b6f2366b952cf77f850b52bde118b592f21c535e223?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    scheduleIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/597d9c4f8ca4920fd271518199fe029c9323f4af6bb697e4be42aa9b32b12295?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    timeIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/e4d23e2ea8776dd2fa8a2afd9811a75ba305a11f5dcf64a447928a8f7eaa6ed8?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
  },
  {
    title: "Data Analyst",
    type: "H-1B Job",
    location: "Seattle, WA",
    salary: "$95,000/year",
    schedule: "Full Time",
    tags: ["Internship", "H-1B", "+2"],
    company: "Infosys Limited",
    logo: `/images/c_logo.png`,
    postedDate: "10 days ago",
    bookmarkIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/9cd71d167930d9a1e1fccb74c58bf8081cee9b50709154e807be4bca0becc89c?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    locationIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/22d1bc782717d04f926ca02b1451c24aca902995035de441483da1d3ce688666?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    salaryIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/8c97b12c45e6ea8bea5ef8d0cdccb11bae0de99a6bb65b2c5fde90b775804a6a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    scheduleIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/56ab27a4f4dadc9f19016298a319de76a22ac132ddaa5f8a9964a3092afbd5bb?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    timeIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/549b5e9de63155135a1b1ca5fcdfc5a1f032bbb2a2b5314cd29e2eece4c6ff5b?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
  },
  {
    title: "Data Analyst",
    type: "H-1B Job",
    location: "Seattle, WA",
    salary: "$95,000/year",
    schedule: "Full Time",
    tags: ["Internship", "H-1B", "+2"],
    company: "Infosys Limited",
    logo: `/images/c_logo.png`,
    postedDate: "10 days ago",
    bookmarkIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/68fd19626fbd3e567bc3ae38a2038a399f579a8cdfc8c41da844c0ad7a974c13?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    locationIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/5e5799f2b54bac5fc445e6dced732f20cff26ed74c8a2f6a0b1c4af03bdb49cb?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    salaryIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/7b5d32037f5f9c04447a5b6f2366b952cf77f850b52bde118b592f21c535e223?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    scheduleIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/4e397c421140e02f8fb5774e54c3627f0c333592da7c248a50c35d07c1832957?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    timeIcon: `https://cdn.builder.io/api/v1/image/assets/TEMP/e4d23e2ea8776dd2fa8a2afd9811a75ba305a11f5dcf64a447928a8f7eaa6ed8?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
  },
];

export const FeaturedJobs = () => {
  const { isSignedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
            Featured Visa-Sponsored Jobs Hiring Now
            </h1>
          </div>
          <button
            className={styles.viewAllButton}
            onClick={() => setIsModalOpen(true)}
          >
            <span>View All</span>
            <img
              src={`https://cdn.builder.io/api/v1/image/assets/TEMP/e61b92bd626119bc96a9ae93346822098c661b12e3d6ab2cf37cc3ece0afca1e?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
              alt=""
            />
          </button>
        </div>

        <div className={styles.jobsGrid}>
          {jobsData.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
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
    </section>
  );
};
