import { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/Map';
import Departments from './pages/Departments';
import UsersPage from './pages/Users';
import AuditLogs from './pages/AuditLogs';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapPage />;
      case 'departments':
        return <Departments />;
      case 'complaints':
        return <UsersPage />;
      case 'logs':
        return <AuditLogs />;
      case 'analytics':
        return <div className="p-8 text-center text-slate-500">Analytics Insights Coming Soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>
    </MainLayout>
  )
}

export default App
