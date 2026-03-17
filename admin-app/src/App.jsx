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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
