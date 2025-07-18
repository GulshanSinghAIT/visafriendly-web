import React from "react";
import { SocialIcon } from "./SocialIcon";
import { QuickLink } from "./QuickLink";
import { NewsletterForm } from "./NewsletterForm";
import { SignedIn } from "@clerk/clerk-react";
import styles from "./Footer.module.css";

const socialLinks = [
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/b041774fd7d2156beaddc2594d66713f2a74831b55a5bad5734ad048a0222559?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    alt: "Facebook",
    href: "#",
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/872d7cf64a83561808b1740639298a46a095f8cc66141e0d81461ead1dfb7a87?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    alt: "Twitter",
    href: "#",
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/ec7279494506dd53fc8171660e8522bdf3471ea8e3486f7a45fc25831f3c2f34?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    alt: "Instagram",
    href: "#",
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/21bfef50af9527c30a66b63ec22bd64421ed0c0e1e6d3bdcd21b426e89b926c4?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    alt: "LinkedIn",
    href: "#",
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/0846c5f77af4fdcb1f97b35c9e867a295d4e222c8ecf9c9c643dcd941210915a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    alt: "YouTube",
    href: "#",
  },
];

const quickLinks = [
  { text: "How Its Works?", href: "#" },
  { text: "H1B Jobs", href: "#" },
  { text: "Cap-Exempt Jobs", href: "#" },
  { text: "Pricing", href: "#" },
  { text: "Blogs", href: "/blogs" },
  { text: "About Us", href: "/aboutUs" },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <div className=" flex items-center justify-center md:justify-start gap-2">
              <img
                loading="lazy"
                src={`https://cdn.builder.io/api/v1/image/assets/TEMP/974ceeac5b8aa6c222361e3781552e402265f835989a74e226dfa572825e3b37?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
                alt="VisaFriendly Logo"
                className={styles.logo}
              />
              <span className=" text-base md:text-lg font-bold">VisaFriendly</span>
            </div>
            <p className={styles.tagline}>
              Empowering Job Seekers with Innovative and Efficient Tools to Help
              You Land Your Dream Job with Confidence
            </p>
            <p className={styles.contact}>
              Contact Us:{" "}
              <span className={styles.support}>support@visafriendly.com</span>
            </p>
            

            <div className={styles.socialLinks}>
              <p className={styles.reach}>Reach Us:</p>
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} {...link} />
              ))}
            </div>
          </div>

          <nav className={styles.quickLinksSection} aria-label="Quick links">
            <h2 className={styles.sectionTitle}>QUICK LINKS</h2>
            <div className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <QuickLink key={index} {...link} />
              ))}
            </div>
          </nav>

          <div className={styles.storySection}>
            <h2 className={styles.sectionTitle}>OUR STORY</h2>
            <p className={styles.storyText}>
              Visa Friendly simplifies travel by offering clear, personalized
              visa guidance, empowering students worldwide to move forward with
              confidence.
            </p>
            <div className={styles.newsletterSection}>
              <h3 className={styles.newsletterTitle}>
                Subscribe to our newsletter for updates.
              </h3>
              <NewsletterForm />
              <SignedIn>
                <div className={styles.tick}>
                  <input type="checkbox" className={styles.box} />{" "}
                  <span>Change Email</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <hr className={styles.divider} />
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              @ 2024 VisaFriendly. All rights reserved
            </p>
            <div className={styles.legalLinks}>
              <a href="/blogs" className={styles.legalLink}>
                Privacy Policy
              </a>
              <a href="blogs" className={styles.legalLink}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
