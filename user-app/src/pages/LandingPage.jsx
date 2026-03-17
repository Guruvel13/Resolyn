import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Map as MapIcon, Phone, Search, LockKeyhole, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Placeholder logic 

  const metrics = [
    { id: 1, label: 'Resolution Rate', value: '98%', trend: '+2.4%' },
    { id: 2, label: 'Avg. Fix Time', value: '24 Hours', trend: '-12%' },
    { id: 3, label: 'Active Reports', value: '1,204', trend: 'Live' },
  ];

  const quickActions = [
    {
      id: "report",
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: "File a New Report",
      description: "Submit issues regarding civic amenties instantly.",
      path: "/file-report",
      color: "bg-indigo-50 border-indigo-100",
    },
    {
      id: "track",
      icon: <MapIcon className="w-8 h-8 text-emerald-600" />,
      title: "Track My Status",
      description: "Monitor the real-time progress of your filed issues.",
      path: "/dashboard",
      color: "bg-emerald-50 border-emerald-100",
    },
    {
      id: "emergency",
      icon: <Phone className="w-8 h-8 text-rose-600" />,
      title: "Emergency Contacts",
      description: "Direct lines to first responders and crisis teams.",
      path: "#",
      color: "bg-rose-50 border-rose-100",
      isModal: true
    }
  ];

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 mt-6 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-3xl opacity-60"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" /> Official City Service Portal
            </span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Bridging citizens & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Administration</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
            A secure, automated hub for resolving civic infrastructure issues. Built with institutional-grade security for absolute transparency.
          </motion.p>
          
          {/* Global Search Built-in */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white border border-slate-300 shadow-md rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <div className="pl-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search public complaints by ID or location..." 
                className="w-full py-4 pl-3 pr-4 text-slate-700 outline-none text-lg bg-transparent placeholder:text-slate-400"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 font-semibold transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Bar */}
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                {metric.id === 3 && <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />}
                {metric.label}
              </p>
              <h3 className="text-3xl font-bold text-slate-900">{metric.value}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${metric.trend.includes('+') || metric.trend === 'Live' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
              {metric.trend}
            </div>
          </div>
        ))}
      </motion.section>

      {/* Smart Actions & Login Logic */}
      <section className="mt-12 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Actions</h2>
          {!isAuthenticated && (
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm focus:ring-4 focus:ring-slate-200">
              <LockKeyhole className="w-4 h-4" />
              Sign in with Phone / OTP
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 + (index * 0.1) }}
              key={action.id} 
              onClick={() => !action.isModal && navigate(action.path)}
              className={`group cursor-pointer rounded-2xl p-8 border hover:shadow-lg transition-all transform hover:-translate-y-1 bg-white`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${action.color}`}>
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-slate-600 mb-6 line-clamp-2">
                {action.description}
              </p>
              <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                Action <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
