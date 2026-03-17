import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import AdminMap from './pages/AdminMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="heatmap" element={<AdminMap />} />
          <Route path="reports" element={<div className="p-10 font-bold text-slate-400 uppercase tracking-widest">Reports Module - Generating Stream...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
