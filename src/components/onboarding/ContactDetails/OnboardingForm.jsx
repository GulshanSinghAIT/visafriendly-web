import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FormInput } from "./FormInput";
import styles from "./OnboardingForm.module.css";
import { steps } from "../preferences/data/steps";
import { ProgressSteps } from "../preferences/components/ProgressSteps";
import { useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";

export function OnboardingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const password = location.state?.password.password;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: email,
    mobile: "",
    city: "",
    state: "",
    password: password,
    referralSource: "",
    Summary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/contactDetails`,
        formData
      );
      console.log('Server response:', response.data);
      navigate("/onboarding/ResumeCV");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
       <div className=" absolute top-5 left-3 md:left-10">
                <img src="/images/visafriendly.png" alt="visafriendly" className="h-10" />
            </div>
      <div className={styles.content}>
        <ProgressSteps steps={steps} currentPage={1} />
        <h1 className={styles.title}>Awesome! Let's kick things off by building your profile</h1>
        <form onSubmit={handleSubmit} className={styles.onboardingForm}>
          <div className={styles.formGrid}>
            <FormInput
              label="First Name"
              placeholder="Enter your first name"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
            <FormInput
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}        
              required
            />
            <FormInput
              label="City"
              placeholder="Enter City"
              id="city"
              value={formData.city}
              onChange={handleChange}             
              required
            />
            <FormInput
              label="State"
              placeholder="Enter State"
              id="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <div className={styles.fullWidth}>
              <label htmlFor="referralSource" className={styles.label}>How'd you hear about VisaFriendly?</label>
              <select
                id="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className={styles.selectInput}
                required
              >
                <option value="">Select</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Google">Google</option>
                <option value="VisaFriendly Social Media">VisaFriendly Social Media</option>
                <option value="Creator/Influencers">Creator/Influencers</option>
                <option value="WhatsApp Group">WhatsApp Group</option>
                <option value="University">University</option>
                <option value="Referred by Friend">Referred by Friend</option>
                <option value="Instagram Ads">Instagram Ads</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.inputGroup +" "+ styles.fullWidth}>
              <label htmlFor="Summary" className={styles.label}>Summary</label>
              <textarea
                id="Summary"
                value={formData.Summary}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/);
                  if (words.length <= 120 || e.target.value === '') {
                    handleChange(e);
                  }
                }}
                placeholder="Enter your summary (max 120 words)"
                className={styles.textarea}
                rows={4}
              />
              <div className={styles.wordCount}>
                {formData.Summary ? formData.Summary.trim().split(/\s+/).length : 0}/120 words
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
