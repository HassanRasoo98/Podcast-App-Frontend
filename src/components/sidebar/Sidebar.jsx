import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Icon from "../../Assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faFire,
  faPlay,
  faList,
  faBookmark,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark" : "light"}`}>
      <div className="profile">
        <img src={Icon} alt="Profile" className="profile-icon" />
      </div>
      <nav>
        <ul className="menu-items">
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faHeadphones} className="hover:text-[#2564ed] item-icon" />
              Discover
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <FontAwesomeIcon icon={faFire} className="item-icon" />
              Trending
            </Link>
          </li>
          <li>
            <Link to="/streaming">
              <FontAwesomeIcon icon={faPlay} className="item-icon" />
              Streaming
            </Link>
          </li>
          <li>
            <Link to="/playlist">
              <FontAwesomeIcon icon={faList} className="item-icon" />
              Playlist
            </Link>
          </li>
          <li>
            <Link to="/bookmark">
              <FontAwesomeIcon icon={faBookmark} className="item-icon" />
              Bookmark
            </Link>
          </li>
        </ul>
      </nav>

      <div className="toggle" onClick={toggleDarkMode}>
        {darkMode ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
        <span>Change Theme</span>
      </div>
    </div>
  );
};

export default Sidebar;
