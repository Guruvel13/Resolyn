import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ComplaintForm from './pages/ComplaintForm';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import ProfileSettings from './pages/ProfileSettings';
import TicketDetails from './pages/TicketDetails';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="file-report" element={<ComplaintForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ticket/:id" element={<TicketDetails />} />
          <Route path="chat/:id" element={<ChatInterface />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
        <Route path="file-report" element={<ComplaintForm />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ticket/:id" element={<TicketDetails />} />
        <Route path="chat/:id" element={<ChatInterface />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
