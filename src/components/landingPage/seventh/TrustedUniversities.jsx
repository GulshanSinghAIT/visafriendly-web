import * as React from "react";
import styles from "./TrustedUniversities.module.css";

export function TrustedUniversities() {
  const universities = [
    { src: "./images/university1.png", width: "9.9479167vw" },
    { src: "./images/university2.png", width: "14.21875vw" },
    { src: "./images/university3.png", width: "11.3020834vw" },
    { src: "./images/university4.png", width: "13.020834vw" },
    { src: "./images/university5.png", width: "13.1770834vw" },
    { src: "./images/university6.png", width: "12.5521vw" },
    { src: "./images/university7.png", width: "24.21875vw" },
    { src: "./images/university8.png", width: "12.1875vw" },
    { src: "./images/university9.png", width: "14.0625vw" },
    { src: "./images/university10.png", width: "9.5834vw" },
    { src: "./images/university11.png", width: "12.34375vw" },
    { src: "./images/university12.png", width: "8.020834vw" },
  ];

  return (
    <div className={styles.trustedSection}>
      <div className={styles.trustedSectionHead}>
        <div className="text-[#313DEB]  text-base sm:text-lg md:text-xl">
          Empowering International Students
        </div>
        <div className="text-black font-semibold text-2xl sm:text-3xl md:text-4xl">
          Trusted by Leading Universities and Institutions
        </div>
      </div>
      <div className={styles.trustedBody}>
        <div className={styles.trustedUniversityGrid}>
          {universities.map((university, i) => (
            <div key={i}  className=" mx-auto gap-2">
              <img
                src={university.src}
                className="h-9 md:h-12"
                alt={`University ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
