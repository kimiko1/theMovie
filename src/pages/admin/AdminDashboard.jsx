import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../../css/dashboard.css';  // Assurez-vous que le CSS est bien lié

// Composants pour différentes sections du dashboard
import UserDashboard from './UsersDashboard';


const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">Admin Dashboard</div>
        <Link to="/admin/users" className="sidebar-item">Users</Link>
      </div>

      {/* Main content */}
      <div className="dashboard-content">
        <Routes>
          <Route path="users" element={<UserDashboard />} />
          {/* Route par défaut */}
          <Route path="/" element={<div className="dashboard-header">Welcome to the Admin Dashboard</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
