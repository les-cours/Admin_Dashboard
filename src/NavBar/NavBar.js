import React, { useEffect, useState, useRef } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import Switch from "./Switch";
import s from "./s.png";
function NavBar({ setConnected }) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileInfoVisible, setProfileInfoVisible] = useState(false);
  const profileRef = useRef(null);

  /*
  functions
  */
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    setProfileInfoVisible(false);
  };

  useEffect(() => {
    // Retrieve the userInfo from localStorage
    const userInfo = localStorage.getItem("userInfo");
    setProfileInfoVisible(false);
    if (userInfo) {
      // Parse the JSON string to get the user object
      const user = JSON.parse(userInfo);
      // Extract the avatar property
      const avatarSVG = user.avatar;
      setAvatar(avatarSVG);
    }

    // Event listener to close profile info when clicking outside
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileInfoVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showProfileHandler = () => {
    setProfileInfoVisible(!isProfileInfoVisible);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setConnected(false);
    navigate("/login");
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.logoDiv}>
        <img src={logo} alt="Logo" />
      </div>

      <div className={styles.linksDiv} style={{ marginLeft: "40px" }}>
        <Link to="/home" className={styles.link}>
          الرئيسية
        </Link>
        <Link to="/teachers" className={styles.link}>
          الأساتذة{" "}
        </Link>
        <Link to="/students" className={styles.link}>
          التلاميذ{" "}
        </Link>

        <div className={styles.profile} ref={profileRef}>
          <div className={styles.avatarContainer} onClick={showProfileHandler}>
            <img src={s} alt="tt" style={{ with: "12px" }} />
          </div>
          {isProfileInfoVisible && (
            <div className={styles.profileInfo}>
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileInfoVisible(false);
                }}
              >
                تعديل الملف الشخصي
              </button>
              <button className={styles.dark}>
                الوضع المظلم
                <Switch
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </button>

              <button onClick={logout} className={styles.logoutButton}>
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
