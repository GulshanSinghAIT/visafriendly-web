import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { NavigationItem } from "./NavigationItem";
import { navigationItems } from "./NavigationData";
import { useNavigate, useLocation } from "react-router-dom";

export function NavigationBar({ profileData }) {
  const [activeId, setActiveId] = useState(1); // Track active item by its ID
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // Set active item based on the current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navigationItems.find((item) =>
      currentPath.includes(item.label)
    );
    if (activeItem) {
      setActiveId(activeItem.id); // Set the active ID based on the current route
    }
  }, [location, navigationItems]);

  // Function to send data to backend
  const sendDataToBackend = async (data) => {
    if (!data) return; // No data to send

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/first`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile data");
      }

      // Optionally store a success flag
      localStorage.setItem("profileDataSaved", "true");
    } catch (error) {
      console.error("Error saving profile data:", error);
      // Store failed request to retry later
      localStorage.setItem(
        "pendingProfileData",
        JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  const handleClick = (id, label) => {
    setActiveId(id); // Set active item when clicked
    // sendDataToBackend(profileData);
    navigate(`/${label}`); // Navigate to the selected page
  };

  return (
    <nav
      className={styles.navigationContainer}
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.id}
          title={item.title}
          icon={item.icon}
          isActive={item.id === activeId} // Set active state based on clicked ID
          onClick={() => handleClick(item.id, item.label)} // Attach click handler
        />
      ))}
    </nav>
  );
}
