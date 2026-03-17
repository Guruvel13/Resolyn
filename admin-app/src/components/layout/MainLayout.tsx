import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout({ 
  children, 
  activeTab, 
  onTabChange 
}: { 
  children: React.ReactNode,
  activeTab: string,
  onTabChange: (id: string) => void
}) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <main className="p-8 flex-1">
          {children}
        </main>
        
        <footer className="px-8 py-6 border-t border-gray-200 text-slate-400 text-xs flex justify-between">
          <p>© 2024 Enterprise Systems Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
