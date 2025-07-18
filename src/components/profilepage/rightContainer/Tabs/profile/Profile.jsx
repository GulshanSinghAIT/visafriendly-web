"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinksForm } from "./components/Links/LinksForm.jsx";
import { WorkExperience } from "./components/experience/WorkExperience";
import {
  JOB_TYPES,
  ROLES,
} from "./constants/formOptions";
import styles from "./Profile.module.css";
import  EducationSection  from "./components/Education/EducationSection.tsx";

import { useUser } from "@clerk/clerk-react";
import useUserSkillsStore from "../../../../../store/userSkillsStore";
import ActiveSkills from "./components/Skills/ActiveSkills.jsx";

export const Profile = () => {
  // Form state
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    github: "",
    portfolio: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillExperience, setNewSkillExperience] = useState("");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // Get skills from Zustand store
  const { skills, setSkills, addSkill, removeSkill } = useUserSkillsStore();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!email) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/general/${email}`
        );
        const userData = response.data.data;
        console.log('User Data:', userData);
        console.log('Skills:', userData.skills);

        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setPrimaryRole(userData.primaryRole || "");
        setExperience(userData.yearsOfExperience || "");
        setSummary(userData.Summary || "");
        setSelectedJobTypes(userData.jobTypes?.map((jt) => jt.id) || []);
        setSelectedRoles(userData.openRoles?.map((role) => role.id) || []);

        // Update skills in Zustand store
        if (userData.skills && userData.skills.length > 0) {
          const formattedSkills = userData.skills.map((skill, index) => ({
            id: index + 1,
            name: skill.name,
            years: skill.experienceInYears
              ? `${skill.experienceInYears} Year${skill.experienceInYears !== 1 ? "s" : ""
              }`
              : "0 Year",
          }));
          setSkills(formattedSkills);
        }
        if (userData.socialLinks) {
          setSocialLinks({
            linkedin: userData.socialLinks.linkedin || "",
            twitter: userData.socialLinks.twitter || "",
            github: userData.socialLinks.github || "",
            portfolio: userData.socialLinks.portfolio || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);
  const handleSocialLinksChange = (id, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async () => {
    try {
      const profileData = {
        user: {
          email,
          firstName,
          lastName,
          role: primaryRole,
          yearsOfExperience: experience,
        },
        jobTypes: selectedJobTypes.map((jobTypeId) => ({
          name: JOB_TYPES.find((jt) => jt.id === jobTypeId)?.label,
        })),
        openRoles: selectedRoles.map((roleId) => ({
          id: roleId,
          yearsOfExperience: experience,
        })),
        skills: skills.map((skill) => ({
          name: skill.name,
          experienceInYears: parseInt(skill.years) || 0,
        })),
        socialLinks: socialLinks,
      };

      await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, profileData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "Failed to update profile. Please try again. Could be that you have again selected the same skill or open roles "
      );
    }
  };

  // Prepare profile data for backend submission
  const getProfileData = () => {
    return {
      user: {
        firstName,
        lastName,
      },
      profile: {
        primaryRole,
        yearsOfExperience: experience,
        preferredJobTypes: selectedJobTypes,
        openToRoles: selectedRoles.map((roleId) => {
          const role = ROLES.find((r) => r.id === roleId);
          return { roleId, name: role?.label };
        }),
      },
      skills: skills.map((skill) => ({
        name: skill.name,
        yearsOfExperience: skill.years,
      })),
      email: email,
    };
  };

  const handleJobTypeToggle = (jobId) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    if (value && !selectedRoles.includes(value)) {
      setSelectedRoles((prev) => [...prev, value]);
    }
  };

  const handleRoleRemove = (roleId) => {
    setSelectedRoles((prev) => prev.filter((role) => role !== roleId));
  };

  const handleAddSkill = () => {
    if (!newSkill || !newSkillExperience) {
      alert("Please select both skill and years of experience.");
      return;
    }

    const skillExists = skills.some((skill) => skill.name === newSkill);
    if (skillExists) {
      alert("Skill already added.");
      return;
    }

    const experienceMap = {
      lessThanOne: "0 Year",
      oneToTwo: "2 Years",
      twoToFive: "4 Years",
      moreThanFive: "5+ Years",
    };

    const formattedExperience = experienceMap[newSkillExperience];

    const newSkillObj = {
      id: skills.length + 1,
      name: newSkill,
      years: formattedExperience,
    };

    addSkill(newSkillObj);
    setNewSkill("");
    setNewSkillExperience("");
  };

  const handleSkillRemove = (skillId) => {
    removeSkill(skillId);
  };

  useEffect(() => {
    if (newSkill && newSkillExperience) {
      handleAddSkill();
    }
  }, [newSkill, newSkillExperience]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className="text-2xl text-start font-semibold">
        About Me
      </h1>
      <p className={styles.sectionDescription}>
        {summary}
      </p>
      <hr className={styles.dividerLast} />

      <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Education Details</h2>
        <EducationSection />
      </section>
      <hr className={styles.dividerLast} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Work Experiences</h2>
        <WorkExperience />
      </section>
      <hr className={styles.dividerLast} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <ActiveSkills />
      </section>
      <hr className={styles.dividerLast} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Social Profiles</h2>
        <LinksForm />
      </section>
      

    </div>
  );
};
