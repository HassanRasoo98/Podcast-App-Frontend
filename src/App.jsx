import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup"; // Adjust path as necessary
import Login from "./login/Login"; // Optional for routing
import Dashboard from "./dashboard/Dashboard";
import PodcastDetail from './components/PodcastDetail/PodcastDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
