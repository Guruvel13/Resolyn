import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Mail, Phone, ShieldCheck, FileEdit, Trash2, ArrowRight, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    push: false,
  });

  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, draftData] = await Promise.all([
          api.get('/users/profile'),
          api.get('/drafts')
        ]);

        if (userData) {
          setProfile({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            bio: userData.bio || ''
          });
          setNotifications({
            sms: userData.notifications?.sms ?? true,
            email: userData.notifications?.email ?? true,
            push: userData.notifications?.push ?? false
          });
        }

        if (Array.isArray(draftData)) {
          setDrafts(draftData);
        }
      } catch (err) {
        console.error('Failed to fetch profile settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/users/profile', {
        ...profile,
        notifications
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDraft = async (id) => {
    try {
      await api.delete(`/drafts/${id}`);
      setDrafts(drafts.filter(d => d._id !== id));
    } catch (err) {
      console.error('Failed to delete draft:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full pt-8 animate-in fade-in duration-500">
      
      <div className="mb-10 lg:flex lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account & Preferences</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your security settings and drafted reports.</p>
        </div>
        {showSuccess && (
           <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                 <Check size={18} />
              </div>
              <p className="text-sm font-bold text-emerald-700">Settings Updated</p>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
              <User className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{profile.name || 'Citizen Account'}</h2>
            <p className="text-sm font-semibold text-slate-500 mt-1">{profile.phone || '+91 (Not Set)'}</p>
            
            <div className="mt-8 space-y-4 text-left">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
               </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {isSaving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Notifications Section */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-indigo-500" /> Alert Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-blue-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email Updates</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Receive detailed progress reports via email.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications({...notifications, email: !notifications.email})}
                  className={`w-14 h-7 rounded-full transition-colors relative ${notifications.email ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <span className={`block w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${notifications.email ? 'left-8' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-emerald-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">SMS Alerts</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Instant text messages when officer is assigned.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                  className={`w-14 h-7 rounded-full transition-colors relative ${notifications.sms ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <span className={`block w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${notifications.sms ? 'left-8' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Drafts Section */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileEdit className="w-6 h-6 text-emerald-500" /> Saved Drafts
              </h3>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                {drafts.length} Active
              </span>
            </div>

            {drafts.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
                <FileEdit className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-500">No drafted reports found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {drafts.map(draft => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    key={draft._id} 
                    className="flex flex-col sm:flex-row items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl group hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {draft.department}
                        </span>
                        <span className="text-xs font-medium text-slate-400">&bull; Saved {new Date(draft.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg">{draft.title || 'Incomplete Report'}</h4>
                      
                      <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: draft.progress }}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto self-end sm:self-center">
                      <button 
                        onClick={() => deleteDraft(draft._id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => navigate('/file-report', { state: { draftId: draft._id } })}
                        className="flex items-center gap-2 bg-white text-indigo-700 font-bold border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
                      >
                        Resume <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
