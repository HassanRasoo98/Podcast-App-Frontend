import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ListenerDashboard from "../components/homepage/homepage";
import ProfileSection from "../components/profile/ProfileSection";
import "./Dashboard.css";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <button className="profile-toggle" onClick={toggleProfile}>
          <img src="/path/to/profile-icon.png" alt="Profile" />
        </button>
        {showProfile? <ProfileSection />: <ListenerDashboard/>}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;