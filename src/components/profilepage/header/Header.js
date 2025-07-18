import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "./Header.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LogoutModal } from "../../logoutPopup/LogoutModal";
import { LogoutModal as LogoutSuccess } from "../../logoutSucessPopup/LogoutModal";

export function Header({
  logoUrl,
  hrefName,
  hrefNameIcon,
  navLinks,
  actionIcons,
}) {
  const { isSignedIn } = useUser();
  const [isLogged, setIsLogged] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const searchUrl = window.location.pathname;
  const str = searchUrl.split("/");
  const presentHrefName = str.pop();
  const [drop, setDrop] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const email = user?.emailAddresses[0]?.emailAddress;
  const [fullName, setFullName] = useState("");
  const [avatarText, setAvatarText] = useState("A");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (!email) return;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/settings/general`,
          { orgEmail: email }
        );

        const firstName = response.data.firstName || "";
        const lastName = response.data.lastName || "";
        const fullNameTemp = `${firstName} ${lastName}`.trim();
        setFullName(fullNameTemp);

        // Set avatar text based on full name
        const avatarInitials = getAvatarInitials(firstName, lastName);
        setAvatarText(avatarInitials);

        if (response.data.profilePicture) {
          setProfilePicture(response.data.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [email]);

  const getAvatarInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  function profileDropDown() {
    setDrop(!drop);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const formatEmail = (email) => {
    if (!email) return "";
    if (email.length > 20) {
      return email.substring(0, 17) + "...";
    }
    return email;
  };

  async function handleLogout() {
    try {
      await signOut();
      window.location.href = "/home";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <header className="header">
      <Link to="/home" onClick={closeMobileMenu}>
        <div className="logo-container">
              <img
              src="/images/logo.png"
              alt="VisaFriendly Logo"
              className="logo-icon"
              width="51.62"
              height="51.62"
            />
          <span className=" text-xl md:text-3xl font-bold">VisaFriendly</span>
        </div>
      </Link>

      {/* Mobile hamburger menu button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>

      {/* Navigation links - desktop */}
      <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Mobile menu close button */}
        <button 
          className="block md:hidden text-3xl absolute top-5 right-5"
          onClick={closeMobileMenu}
          aria-label="Close mobile menu"
        >
          ×
        </button>
        
        {navLinks.map((link, index) => (
          <a
            href={hrefName[index]}
            className={
              presentHrefName === hrefName[index]
                ? "nav-link-active"
                : "nav-link"
            }
            key={index}
            onClick={closeMobileMenu}
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="action-icons">
        {actionIcons.map((icon, index) => (
          <a href={hrefNameIcon[index]} key={index}>
            <span title={icon.alt}>
              {icon.alt === "Bookmark" && (
                <img src="/images/ten.png" className="ten" alt="ten" />
              )}
              {(icon.alt === "Bookmark" || icon.alt === "Dashboard") &&
                presentHrefName === hrefNameIcon[index] && (
                  <img src={icon.urlColour} alt={icon.alt} className="icon" />
                )}
              {(icon.alt === "Bookmark" || icon.alt === "Dashboard") &&
                presentHrefName !== hrefNameIcon[index] && (
                  <img src={icon.url} alt={icon.alt} className="icon" />
                )}
            </span>
          </a>
        ))}
        <div onClick={profileDropDown} className="avatar">
          <span>{avatarText}</span>
          {drop && (
            <div>
              <div className="profile">
                <div className="profileHeader">
                  <div className="profileDetails">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        className="profileImage"
                        alt="Profile"
                      />
                    ) : (
                      <div className="defaultAvatar">{avatarText}</div>
                    )}
                    <div className="profileName">
                      <h2 className="fullName">
                        {fullName || "Update The Name"}
                      </h2>
                      <p title={email || "Update The Email"}>
                        {formatEmail(email) || "Update The Email"}
                      </p>
                    </div>
                  </div>
                  <div className="Progress">
                    <CircularProgressbar
                      value={75}
                      text="75%"
                      counterClockwise={true}
                      strokeWidth={16}
                    />
                  </div>
                </div>
                <nav className="profileMid">
                  <div className="refs">
                    <Link className="profileMids" to="/resume">
                      Resume
                    </Link>
                    <Link className="profileMids" to="/jobAlerts">
                      Job Alerts
                    </Link>
                    <Link className="profileMids" to="/profile/subscription">
                      <div className="pricing">
                        <div>Pricing</div>
                        <div className="Plans">
                          <div>Starter Plan</div>
                        </div>
                      </div>
                    </Link>
                    <Link className="profileMids" to="/settings/general">
                      Settings
                    </Link>
                    <Link className="profileMids" to="/refer">
                      Referral
                    </Link>
                    <Link className="profileMids" to="/help">
                      Help
                    </Link>
                  </div>
                </nav>
                <div className="hrDiv">
                  <hr />
                </div>
                <div className="logout">
                  <a
                    onClick={() => {
                      setIsLogged(true);
                    }}
                    className="logout-button"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {isLogged && isSignedIn && (
          <div className="modalOverlay">
            <div className="modalContent">
              <LogoutModal
                onClose={() => {
                  setIsLogged(false);
                }}
                onLogout={async () => {
                  setIsLogged(false);
                  setIsSuccess(true);
                }}
              />
            </div>
          </div>
        )}
        {isSuccess && isSignedIn && (
          <div className="modalOverlay">
            <div className="modalContent">
              <LogoutSuccess
                onClose={() => {
                  setIsLogged(false);
                }}
                onGoHome={async () => {
                  await signOut();
                  setIsLogged(false);
                  window.location.href = "/home";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

Header.defaultProps = {
  logoUrl: "/images/logo.png",
  hrefName: [
    "/dashboard",
    "/allJobsPremiumPlan",
    "/pricing",
  ],
  hrefNameIcon: [ "savedJobs"],
  navLinks: ["Dashboard", "Jobs/ Internships", "Pricing"],
  actionIcons: [
    {
      url: "/images/bookmark.png",
      urlColour: "/images/bookmarkColour.png",
      alt: "Bookmark",
    },
  ],
};
