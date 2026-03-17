import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ComplaintForm from './pages/ComplaintForm';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="file-report" element={<ComplaintForm />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat/:id" element={<ChatInterface />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
