import React from "react";
import { useState } from "react";
import "./Header.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function Header({ logoUrl, navLinks, actionIcons, avatarText }) {
  const [drop, setDrop] = React.useState(false);
  function profileDropDown() {
    setDrop(!drop);
  }
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-icon">
          <img
            src={logoUrl}
            alt="VisaFriendly Logo"
            width="51.62"
            height="51.62"
          />
        </div>
        <span className="logo-text">VisaFriendly</span>
      </div>

      <nav className="nav-links">
        {navLinks.map((link, index) => (
          <a href="#" className="nav-link" key={index}>
            {link}
          </a>
        ))}
      </nav>

      <div className="action-icons">
        {actionIcons.map((icon, index) => (
          <span title={icon.alt}>
            <img src={icon.url} alt={icon.alt} className="icon" key={index} />
          </span>
        ))}
        <div onClick={profileDropDown} className="avatar">
          <span>{avatarText}</span>
          {drop && (
            <div>
              <div className="profile">
                <div className="profileHeader">
                  <div className="profileDetails">
                    <img src="./images/avatar.png"></img>
                    <div className="profileName">
                      <h2>David John</h2>
                      <p>david@gmail.com</p>
                    </div>
                  </div>
                  <div className="Progress">
                    <CircularProgressbar
                      value={75}
                      text="75%"
                      counterClockwise="true"
                      strokeWidth={16}
                    ></CircularProgressbar>
                  </div>
                </div>
                <nav className="profileMid">
                  <div className="refs">
                    <a className="profileMids">Resume</a>
                    <a className="profileMids">Manage Job Alerts</a>
                    <a className="profileMids">
                      <div className="pricing">
                        <div>Pricing</div>
                        <div className="Plans">
                          <div>Starter Plan</div>
                        </div>
                      </div>
                    </a>
                    <a className="profileMids">Settings</a>
                    <a className="profileMids">Refer</a>
                    <a className="profileMids">Feature Request</a>
                    <a className="profileMids">Helps</a>
                  </div>
                </nav>
                <div className="hrDiv">
                  <hr></hr>
                </div>
                <div className="logout">
                  <a>Log Out</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  logoUrl: "./images/logo.png",
  navLinks: ["All Jobs", "H-1B Jobs", "Cap-Exempt Jobs"],
  actionIcons: [
    { url: "./images/layout-dashboard.png", alt: "Dashboard" },
    { url: "./images/bookmark.png", alt: "Bookmark" },
  ],
  avatarText: "A",
};
