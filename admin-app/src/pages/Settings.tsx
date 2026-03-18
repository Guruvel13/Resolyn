import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Globe, Monitor, Save, Trash2, Key, Check, AlertCircle, Eye, EyeOff, ArrowUpRight, Map as MapIcon } from 'lucide-react';
import { api } from '../services/api';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // States for interactive settings
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emergency: true,
    newComplaints: true,
    performance: false,
    systemUpdates: true
  });

  const [twoFactor, setTwoFactor] = useState(true);
  const [appearance, setAppearance] = useState({
    theme: 'Light',
    compactMode: false
  });
  const [region, setRegion] = useState({
    language: 'English (US)',
    timezone: '(GMT+05:30) India Standard Time'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.get('/users/profile');
        if (data) {
          setProfileData({
            name: data.name || '',
            email: data.email || '',
            bio: data.bio || ''
          });
          setNotificationSettings({
            emergency: data.notifications?.emergency ?? true,
            newComplaints: data.notifications?.newComplaints ?? true,
            performance: data.notifications?.performance ?? false,
            systemUpdates: data.notifications?.systemUpdates ?? true
          });
          setAppearance({
            theme: data.appearance?.theme || 'Light',
            compactMode: data.appearance?.compactMode || false
          });
          setRegion({
            language: data.region?.language || 'English (US)',
            timezone: data.region?.timezone || '(GMT+05:30) India Standard Time'
          });
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/users/profile', {
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        notifications: {
          ...notificationSettings
        },
        appearance: {
          ...appearance
        },
        region: {
          ...region
        }
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderContent = () => {
    if (loading) return (
      <div className="flex items-center justify-center p-20">
        <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

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
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                <input 
                  type="email" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium" 
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Departmental Bio</label>
                <textarea 
                  rows={3} 
                  value={profileData.bio} 
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Tell us about your role..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium resize-none shadow-inner" 
                />
              </div>
            </div>
          </section>
        );
      case 'Notifications':
        const notifItems = [
          { key: 'emergency', title: 'Emergency Broadcasts', desc: 'Critical sector-wide alerts and hazard warnings.' },
          { key: 'newComplaints', title: 'New Complaints', desc: 'Receive notifications when new incidents are filed in your sector.' },
          { key: 'performance', title: 'Official Performance', desc: 'Summary reports on staff efficiency and task completion.' },
          { key: 'systemUpdates', title: 'System Updates', desc: 'Information about platform maintenance and new features.' },
        ];
        return (
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Bell size={20} className="text-rose-500" /> Alert Preferences
            </h3>
            <div className="space-y-4">
              {notifItems.map((item) => (
                <div 
                  key={item.key} 
                  onClick={() => setNotificationSettings({
                    ...notificationSettings, 
                    [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings]
                  })}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-300 hover:bg-white transition-all group cursor-pointer"
                >
                   <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                   </div>
                   <div className={`w-12 h-6 rounded-full relative p-1 transition-all duration-300 ${notificationSettings[item.key as keyof typeof notificationSettings] ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-slate-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute transition-all duration-300 shadow-sm ${notificationSettings[item.key as keyof typeof notificationSettings] ? 'right-1' : 'left-1'}`}></div>
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
                  <div 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-emerald-200 hover:bg-emerald-50/10 transition-all cursor-pointer group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm"><Shield size={20} className={`${twoFactor ? 'text-emerald-500' : 'text-slate-300'} transition-colors`} /></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                           <p className="text-xs text-slate-500 mt-1 font-medium">Secured via official biometric key.</p>
                        </div>
                     </div>
                     <div className={`w-12 h-6 rounded-full relative p-1 transition-all duration-300 ${twoFactor ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute transition-all duration-300 shadow-sm ${twoFactor ? 'right-1' : 'left-1'}`}></div>
                     </div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-sm hover:shadow-md">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm"><Key size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" /></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Change Password</p>
                           <p className="text-xs text-slate-500 mt-1 font-medium">Last changed 42 days ago.</p>
                        </div>
                     </div>
                     <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                  </div>
               </div>
            </div>

            <div>
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Active Sessions</h4>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] group hover:bg-white transition-all">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm"><Monitor size={20} className="text-indigo-400" /></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Chrome on MacOS • Bangalore, IN</p>
                           <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5">Current Session</p>
                        </div>
                     </div>
                     <button className="px-4 py-2 text-[10px] font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all uppercase tracking-widest">Logout</button>
                  </div>
               </div>
               <button className="mt-6 flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:text-rose-600 transition-all ml-2 group">
                  <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> Revoke all active sessions
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {['Light', 'Dark', 'System'].map((theme) => (
                  <div 
                    key={theme} 
                    onClick={() => setAppearance({...appearance, theme: theme as 'Light' | 'Dark' | 'System'})}
                    className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer text-center group ${appearance.theme === theme ? 'border-slate-900 bg-slate-50 shadow-xl' : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-md'}`}
                  >
                     <div className={`w-full aspect-square sm:aspect-video rounded-2xl mb-4 transition-transform group-hover:scale-95 duration-500 ${theme === 'Dark' ? 'bg-slate-900' : theme === 'System' ? 'bg-gradient-to-br from-white via-slate-200 to-slate-900' : 'bg-white shadow-inner border border-slate-50'}`}></div>
                     <p className={`text-sm font-bold ${appearance.theme === theme ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>{theme}</p>
                     {appearance.theme === theme && (
                       <div className="mt-2 flex justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                       </div>
                     )}
                  </div>
               ))}
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100">
               <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem]">
                  <div>
                     <p className="text-sm font-bold text-slate-900">Compact Mode</p>
                     <p className="text-xs text-slate-500 mt-1 font-medium">Maximize data density in tables and lists.</p>
                  </div>
                  <div 
                    onClick={() => setAppearance({...appearance, compactMode: !appearance.compactMode})}
                    className={`w-12 h-6 rounded-full relative p-1 shadow-inner cursor-pointer transition-all ${appearance.compactMode ? 'bg-slate-900' : 'bg-slate-200'}`}
                  >
                     <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${appearance.compactMode ? 'right-1' : 'left-1'}`}></div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Preferred Language</label>
                <div className="relative group">
                  <select 
                    value={region.language}
                    onChange={(e) => setRegion({...region, language: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all outline-none font-bold text-slate-800 appearance-none shadow-sm group-hover:shadow-md"
                  >
                    <option>English (US)</option>
                    <option>Kannada</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-teal-500 transition-colors">
                     <ArrowUpRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Timezone</label>
                <div className="relative group">
                  <select 
                    value={region.timezone}
                    onChange={(e) => setRegion({...region, timezone: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all outline-none font-bold text-slate-800 appearance-none shadow-sm group-hover:shadow-md"
                  >
                    <option>(GMT+05:30) India Standard Time</option>
                    <option>(GMT+00:00) UTC Standard Time</option>
                    <option>(GMT-08:00) Pacific Standard Time</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-teal-500 transition-colors">
                     <ArrowUpRight size={16} className="rotate-90" />
                  </div>
                </div>
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
                {isSaving ? 'Saving...' : 'Save Configurations'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
