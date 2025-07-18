import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "jobs", href: "/jobsBeforeSignIn" },
  { label: "Internships", href: "/h1b-jobs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/aboutUs" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home">
          <img
            src={`https://cdn.builder.io/api/v1/image/assets/TEMP/57dd4e5f28379f36428cf0499a5ca6b8bee68bc296209058e54f1a4655eb0ef9?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
            alt="VisaFriendly Logo"
            className={styles.logoImage}
          />
        </Link>
        <Link to="/home">
          <span className={styles.logoText}>VisaFriendly</span>
        </Link>
      </div>

      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`${styles.navLink} ${
              activePath === item.href ? styles.activeLink : ""
            }`}
            tabIndex="0"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className={styles.authButtons}>
        <Link className={styles.signInButton} to="/login">
          Sign In
        </Link>
        <Link className={styles.signUpButton} to="/signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
