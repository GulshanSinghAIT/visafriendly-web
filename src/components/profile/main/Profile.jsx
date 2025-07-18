"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputField } from "./components/FormFields/InputField";
import {
  SelectField,
  SelectField_YEAR,
} from "./components/FormFields/SelectField";
import { RoleTag } from "./components/Tags/RoleTag";
import { SkillTag } from "./components/Tags/SkillTag";
import { SocialLinks } from "./components/SocialLinks/SocialLinks";
import {
  JOB_TYPES,
  EXPERIENCE_OPTIONS,
  ROLES,
  Skills,
} from "./constants/formOptions";
import styles from "./Profile.module.css";
import { EducationSection } from "./components/Education/EducationSection.tsx";
import { NavigationBar } from "../NavigationBar/Navigation.jsx";
import { SkillTag as SkillsTag } from "../../onboarding/Skills/SkillTag.jsx";
import Badge from "./components/badge/Badge.jsx";
import { useUser } from "@clerk/clerk-react";
import useUserSkillsStore from "../../../store/userSkillsStore";

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
              ? `${skill.experienceInYears} Year${
                  skill.experienceInYears !== 1 ? "s" : ""
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
    <main className={styles.profileContainer}>
      <NavigationBar profileData={getProfileData()} />

      <div className={styles.content}>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle1}>About Me</h1>
          <p className={styles.sectionDescription}>
            {summary}
          </p>

          <form className={styles.form}>
            <div className={styles.nameFields}>
              <InputField
                label="First Name"
                id="firstName"
                placeholder={firstName || "Enter First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <InputField
                label="Last Name"
                id="lastName"
                placeholder={lastName || "Enter Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className={styles.roleFields}>
              <div className={styles.roleFieldInput}>
                <SelectField
                  label="Role"
                  id="primaryRole"
                  options={ROLES}
                  value={primaryRole || ""}
                  onChange={(e) => setPrimaryRole(e.target.value)}
                  placeholder={
                    primaryRole
                      ? ROLES.find((r) => r.id === primaryRole)?.label
                      : "Select Roles"
                  }
                  required
                />
              </div>
              <SelectField_YEAR
                label="Years of Experience"
                id="experience"
                options={EXPERIENCE_OPTIONS}
                value={experience || ""}
                onChange={(e) => setExperience(e.target.value)}
                placeholder={
                  experience
                    ? EXPERIENCE_OPTIONS.find((e) => e.id === experience)?.label
                    : "Select Years"
                }
                required
              />
            </div>

            <div className={styles.jobTypeSection}>
              <label className={styles.label}>Preferred Job Type</label>
              <div className={styles.badgeContainer}>
                {JOB_TYPES.map((job) => (
                  <div
                    key={job.id}
                    className={styles.jobBadge}
                    onClick={() => handleJobTypeToggle(job.id)}
                  >
                    <Badge
                      text={job.label}
                      selected={selectedJobTypes.includes(job.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rolesSection}>
              <label className={styles.label}>Open to Following Roles</label>
              <select
                id="additionalRoles"
                value=""
                onChange={handleRoleChange}
                className={styles.additionalRoles}
              >
                <option value="" disabled hidden>
                  Select Roles
                </option>
                {ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>

              <div className={styles.selectedRoles}>
                {selectedRoles.map((roleId) => {
                  const role = ROLES.find((r) => r.id === roleId);
                  if (!role) return null; // Add this check
                  return (
                    <SkillsTag
                      key={roleId}
                      label={role?.label || ""} // Add fallback
                      variant={role?.variant || "default"} // Add fallback
                      skill={role?.label || ""} // Add fallback
                      onRemove={() => handleRoleRemove(roleId)}
                    />
                  );
                })}
              </div>
            </div>
          </form>
        </section>

        <hr className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills and Expertise</h2>
          <p className={styles.sectionDescription}>
            Tell us about your skills and expertise.
          </p>

          <div className={styles.skillsSection}>
            <div className={styles.skillsForm}>
              <div className={styles.skillFields}>
                <SelectField
                  label="Enter skills"
                  id="skillInput"
                  options={Skills.filter(
                    (skill) => !skills.some((s) => s.name === skill.value)
                  )}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
              </div>
              <SelectField_YEAR
                label="Years of Experience"
                id="skillExperience"
                options={EXPERIENCE_OPTIONS}
                value={newSkillExperience}
                onChange={(e) => setNewSkillExperience(e.target.value)}
              />
            </div>

            <div className={styles.skillsList}>
              {(showAllSkills ? skills : skills.slice(0, 3)).map((skill) => (
                <SkillTag
                  key={skill.id}
                  skill={skill.name
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  years={skill.years}
                  onRemove={() => handleSkillRemove(skill.id)}
                />
              ))}
            </div>

            {skills.length > 3 && (
              <div className={styles.showMore}>
                <a
                  href="#"
                  className={styles.addLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllSkills(!showAllSkills);
                  }}
                >
                  {showAllSkills ? "Show Less" : "Show More"}
                </a>
              </div>
            )}
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Social Profiles</h2>
          <p className={styles.sectionDescription}>
            Where can people find you online?
          </p>
          <SocialLinks
            existingLinks={socialLinks}
            onChange={handleSocialLinksChange}
          />
        </section>
        <section className={styles.section}>
          <EducationSection />
        </section>
        <hr className={styles.dividerLast} />
        <button
          className={styles.cancelButton}
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </main>
  );
};
