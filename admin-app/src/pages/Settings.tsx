import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Monitor, Save, Trash2, Key, Check, AlertCircle, Eye, EyeOff, ArrowUpRight, Map as MapIcon } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <User size={20} className="text-indigo-600" /> Administrative Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Name</label>
                <input type="text" defaultValue="Admin User" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                <input type="email" defaultValue="admin@resolyn.gov" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Departmental Bio</label>
                <textarea rows={3} defaultValue="Managing nodal operations for Bangalore South sector." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium resize-none" />
              </div>
            </div>
          </section>
        );
      case 'Notifications':
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Bell size={20} className="text-rose-500" /> Alert Preferences
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Emergency Broadcasts', desc: 'Critical sector-wide alerts and hazard warnings.', enabled: true },
                { title: 'New Complaints', desc: 'Receive notifications when new incidents are filed in your sector.', enabled: true },
                { title: 'Official Performance', desc: 'Summary reports on staff efficiency and task completion.', enabled: false },
                { title: 'System Updates', desc: 'Information about platform maintenance and new features.', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group">
                   <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                   </div>
                   <div className={`w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer ${item.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${item.enabled ? 'right-1' : 'left-1'}`}></div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'Security':
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Key size={20} className="text-amber-500" /> Authentication & Privacy
               </h3>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Shield size={18} className="text-emerald-500" /></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                           <p className="text-xs text-slate-500">Secured via official biometric key.</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-widest">Enabled</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Key size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" /></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Change Password</p>
                           <p className="text-xs text-slate-500">Last changed 42 days ago.</p>
                        </div>
                     </div>
                     <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                  </div>
               </div>
            </div>

            <div>
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Active Sessions</h4>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                     <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-slate-400" />
                        <div>
                           <p className="text-xs font-bold text-slate-900">Chrome on MacOS • Bangalore, IN</p>
                           <p className="text-[10px] text-emerald-500 font-bold uppercase">Current Session</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-bold text-rose-500 hover:text-rose-600 uppercase tracking-widest">Logout</button>
                  </div>
               </div>
               <button className="mt-6 flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:text-rose-600 transition-colors ml-1">
                  <Trash2 size={14} /> Revoke all active sessions
               </button>
            </div>
          </section>
        );
      case 'Appearance':
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Monitor size={20} className="text-blue-500" /> Interface Customization
            </h3>
            <div className="grid grid-cols-3 gap-4">
               {['Light', 'Dark', 'System'].map((theme) => (
                  <div key={theme} className={`p-4 rounded-3xl border-2 transition-all cursor-pointer text-center ${theme === 'Light' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}>
                     <div className={`w-full aspect-video rounded-xl mb-3 ${theme === 'Dark' ? 'bg-slate-900' : theme === 'System' ? 'bg-gradient-to-r from-white to-slate-900' : 'bg-white shadow-inner'}`}></div>
                     <p className="text-xs font-bold text-slate-900">{theme}</p>
                  </div>
               ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-bold text-slate-900">Compact Mode</p>
                     <p className="text-xs text-slate-500 mt-1">Maximize data density in tables and lists.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 shadow-inner cursor-not-allowed">
                     <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                  </div>
               </div>
            </div>
          </section>
        );
      case 'Region':
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Globe size={20} className="text-teal-500" /> Regional Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Language</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 appearance-none">
                  <option>English (US)</option>
                  <option>Kannada</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Timezone</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 appearance-none">
                  <option>(GMT+05:30) India Standard Time</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-bold tracking-widest">Global Configuration & Personalization</p>
        </div>
        {showSuccess && (
           <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                 <Check size={18} />
              </div>
              <p className="text-sm font-bold text-emerald-700">Settings Saved Successfully</p>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-1">
          {[
            { name: 'Profile', icon: <User size={18} /> },
            { name: 'Notifications', icon: <Bell size={18} /> },
            { name: 'Security', icon: <Shield size={18} /> },
            { name: 'Appearance', icon: <Monitor size={18} /> },
            { name: 'Region', icon: <Globe size={18} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.name ? 'bg-slate-900 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <span className={`transition-colors ${activeTab === item.name ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`}>
                {item.icon}
              </span>
              {item.name}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-6">
          {renderContent()}

          <div className="flex justify-end gap-3 pt-4">
             <button 
              className="px-8 py-3 bg-white border border-slate-200 text-slate-500 font-bold rounded-2xl text-sm hover:bg-slate-50 transition-all active:scale-95"
              onClick={() => window.location.reload()}
             >
              Discard
             </button>
             <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl text-sm transition-all shadow-xl shadow-slate-100 flex items-center gap-3 active:scale-[0.98] ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800'}`}
             >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? 'Processing...' : 'Save Configurations'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
