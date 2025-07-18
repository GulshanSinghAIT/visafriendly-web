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
      <Link to="/home">
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

      <nav className="nav-links">
        {navLinks.map((link, index) => (
          <a
            href={hrefName[index]}
            className={
              presentHrefName === hrefName[index]
                ? "nav-link-active"
                : "nav-link"
            }
            key={index}
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
                  </div>
                </div>
                 <nav className="profileMid">
                                    <div className="refs">
                                      <Link className="profileMids" to="/profilelayout">
                                        <svg className="menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a className="text-lg font-normal">Profile</a>
                                      </Link>
                                      {/* <Link className="profileMids" to="jobAlerts">
                                        <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a className="text-lg font-normal">Job Alerts</a>
                                      </Link> */}
                                      <Link className="profileMids" to="/profile/subscription">
                                        <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <div className="pricing">
                                        <a className="text-lg font-normal">Pricing</a>
                                          {/* <div className="Plans">
                                            <div>Starter Plan</div>
                                          </div> */}
                                        </div>
                                      </Link>
                                      <Link className="profileMids" to="/settings/general">
                                        <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12.22 2H11.78C10.8538 2 10 2.85375 10 3.78V4.72C10 5.64625 10.8538 6.5 11.78 6.5H12.22C13.1462 6.5 14 5.64625 14 4.72V3.78C14 2.85375 13.1462 2 12.22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M18.25 8.5H17.75C16.8238 8.5 15.97 9.35375 15.97 10.28V11.22C15.97 12.1462 16.8238 13 17.75 13H18.25C19.1762 13 20.03 12.1462 20.03 11.22V10.28C20.03 9.35375 19.1762 8.5 18.25 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M5.75 8.5H5.25C4.32375 8.5 3.47 9.35375 3.47 10.28V11.22C3.47 12.1462 4.32375 13 5.25 13H5.75C6.67625 13 7.53 12.1462 7.53 11.22V10.28C7.53 9.35375 6.67625 8.5 5.75 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M12.22 17.5H11.78C10.8538 17.5 10 18.3538 10 19.28V20.22C10 21.1462 10.8538 22 11.78 22H12.22C13.1462 22 14 21.1462 14 20.22V19.28C14 18.3538 13.1462 17.5 12.22 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a className="text-lg font-normal">Settings</a>
                                      </Link>
                                      <Link className="profileMids" to="/refer">
                                        <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a className="text-lg font-normal">Referral</a>
                                      </Link>
                                      {/* <Link className="profileMids" to="/help">
                                        <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M9.09 9A3 3 0 0 1 12 6C13.5 6 15 7 15 9C15 10.5 13.5 11.5 12 12C12 13 12 14 12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a className="text-lg font-normal">Help</a>
                                      </Link> */}
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
    "/allJobsPremiumPlan",
    "/pricing",
    "/dashboard",
  ],
  hrefNameIcon: [ "savedJobs"],
  navLinks: ["Jobs/ Internships", "Pricing",  "Dashboard"],
  actionIcons: [
    
    {
      url: "/images/bookmark.png",
      urlColour: "/images/bookmarkColour.png",
      alt: "Bookmark",
    },
  ],
};
