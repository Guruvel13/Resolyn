import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Departments from './pages/Departments';
import Map from './pages/Map';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="departments" element={<Departments />} />
        <Route path="map" element={<Map />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
