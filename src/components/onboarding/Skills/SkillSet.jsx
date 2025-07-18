import React, { useState } from "react";
import { SkillInput } from "./SkillInput";
import { SkillTag } from "./SkillTag";
import styles from "./SkillSet.module.css";
import { ProgressSteps } from "../preferences/components/ProgressSteps";
import { steps } from "../preferences/data/steps";
import { useNavigate } from "react-router";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export const SkillSet = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [skills, setSkills] = useState([
    "UX Research",
    "Information Architecture",
  ]);

  const addSkill = (skill) => {
    if (skills.length < 10 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        email,
        skills: skills.map((skill) => ({
          name: skill,
        })),
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/onboarding/skills`, requestData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting skills:", error);
    }
  };

  return (
    <div className={styles.container}>
       <div className=" absolute top-5 left-3 md:left-10">
                <img src="/images/visafriendly.png" alt="visafriendly" className="h-10" />
            </div>
      <div className={styles.content}>
        <ProgressSteps steps={steps} currentPage={4} />
        <div className={styles.containers}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Skill Set<span className={styles.required}>*</span>
            </h2>
            <p className={styles.description}>
              Add your expertise and skills to showcase your capabilities. You
              can select up to 10 skills.
            </p>
          </div>

          <div className={styles.skillsSection}>
            <SkillInput onAddSkill={addSkill} />
            <div className={styles.skillTags} role="list">
              {skills.map((skill) => (
                <SkillTag key={skill} skill={skill} onRemove={removeSkill} />
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <hr className={styles.divider} />
            <div className={styles.buttons}>
              <button
                className={styles.backButton}
                onClick={() => navigate("/onboarding/ResumeCV")}
              >
                Back
              </button>
              <button className={styles.createButton} onClick={handleSubmit}>
                Create My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
