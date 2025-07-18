import { useState, useEffect } from "react";
import { Avatar } from "./Avatar";
import styles from "./UserProfile.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
export const UserProfile = () => {
  const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: "",
    });
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!email) return;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/settings/general`,
          { orgEmail: email }
        );
        console.log("yaha[e", response.data);
        const { firstName, lastName, profilePicture } = response.data;

        setUserData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: email,
          profilePicture: profilePicture || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Keep default names if there's an error
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <div className=" bg-white rounded-xl p-4 flex flex-col  items-center">
      <Avatar firstName={userData.firstName} lastName={userData.lastName} url={userData.profilePicture} />
      <div className={styles.editWrapper}>
        <Link  to="/settings/general">
          <img src="/images/pencil.png" className={styles.edit}></img>
        </Link >
      </div>
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">{`${userData.firstName} ${userData.lastName}`}</h1>
    </div>
  );
};
