import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ListenerDashboard from "../components/homepage/homepage";
import ProfileSection from "../components/profile/ProfileSection";
import UploadPodcast from "../components/UploadPoscast/UploadPodcast"; // Import the UploadPodcast component
import "./Dashboard.css";
import addIcon from "../Assets/add.png"

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const toggleProfile = () => {
    setActiveComponent(activeComponent === "profile" ? "dashboard" : "profile");
  };

  
  const showUploadPodcast = () => {
    setActiveComponent("uploadPodcast");
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <button className="profile-toggle" onClick={toggleProfile}>
          <img src="/path/to/profile-icon.png" alt="Profile" />
        </button>
        <button className="add_content" onClick={showUploadPodcast}>
          <img src={addIcon} alt="Add Content" />
        </button>

        {activeComponent === "profile" && <ProfileSection />}
        {activeComponent === "uploadPodcast" && <UploadPodcast />}
        {activeComponent === "dashboard" && <ListenerDashboard />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
