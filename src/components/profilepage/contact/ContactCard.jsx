import React, { useState, useEffect } from "react";
import { ContactItem } from "./ContactItem";
import { contactItems } from "./ContactData";
import styles from "./ContactCard.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import API_CONFIG from "../../../config/api.js";

export default function ContactCard() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    contactItems.reduce((acc, item) => {
      acc[item.type] =
        item.type === "email"
          ? user?.emailAddresses[0]?.emailAddress
          : item.text;
      return acc;
    }, {})
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = user?.emailAddresses[0]?.emailAddress;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/contact?email=${email}`
        );
        const userData = response.data;

        setFormData({
          email: userData.email || user?.emailAddresses[0]?.emailAddress,
          phone: userData.mobileNumber || "",
          location: userData.location || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e, type) => {
    setFormData({ ...formData, [type]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        email: formData.email,
        mobileNumber: formData.phone,
        location: formData.location,
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/updateContact`,
        updatedData
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl relative p-4 md:p-7 flex flex-col  items-center">

      <div className=" flex justify-between w-full items-center">
        <h1 className={styles.title}>Contact</h1>
        <img
          loading="lazy"
          src="/images/pencil.png"
          alt="contact header icon"
          className={styles.headerIcon}
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.contactList}>
        {contactItems.map((item, index) => (
          <ContactItem
            key={index}
            icon={item.icon}
            text={
              isEditing ? (
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData[item.type]}
                  onChange={(e) => handleChange(e, item.type)}
                />
              ) : (
                formData[item.type]
              )
            }
            type={item.type}
          />
        ))}
      </div>
      {isEditing && (
        <div className={styles.cardContainer}>
          <div className={styles.buttonGroup}>
            <div className={styles.cancelButtonWrapper}>
              <div
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </div>
            </div>
            <div className={styles.saveButtonWrapper}>
              <div className={styles.saveButton} onClick={handleSave}>
                Save
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
