import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  LockKeyhole, 
  ArrowRight, 
  FileText, 
  Map as MapIcon, 
  Phone, 
  ChevronRight, 
  HelpCircle, 
  BookOpen, 
  LifeBuoy, 
  Quote,
  ArrowUpRight,
  Minus
} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = false;

  const metrics = [
    { id: 1, label: 'RESOLUTION RATE', value: '98%', trend: '+4.5%', isPositive: true },
    { id: 2, label: 'AVG. FIX TIME', value: '24 Hours', trend: '-12%', isPositive: true },
    { id: 3, label: 'ACTIVE REPORTS', value: '1,204', trend: '+14', isPositive: false },
  ];

  const quickActions = [
    {
      id: "report",
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      title: "File a New Report",
      description: "Submit details reporting a new amenities incident.",
      path: "/file-report",
      iconBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "track",
      icon: <MapIcon className="w-5 h-5 text-emerald-600" />,
      title: "Track My Status",
      description: "Monitor the real-time progress of your filed issues.",
      path: "/dashboard",
      iconBg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      id: "emergency",
      icon: <Phone className="w-5 h-5 text-rose-600" />,
      title: "Emergency Contacts",
      description: "Direct lines to first responders and crisis teams.",
      path: "#",
      iconBg: "bg-rose-50",
      textColor: "text-rose-600",
      isModal: true
    }
  ];

  const recentUpdates = [
    {
      id: 1,
      tag: "INFRASTRUCTURE",
      date: "JAN 12, 2024",
      title: "Smart Street Lighting Deployment in West District",
      desc: "New AI-enabled LED units have reduced energy consumption by 40% across 50 sectors.",
      tagColor: "text-blue-600",
      boxBrandColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      id: 2,
      tag: "PUBLIC SAFETY",
      date: "JAN 08, 2024",
      title: "Main Street Pothole Repair Initiative Complete",
      desc: "Over 45 major arterial road defects have been resolved ahead of the seasonal forecast.",
      tagColor: "text-emerald-600",
      boxBrandColor: "bg-[#e2e8d3] text-[#6b7654] border-[#d2dbbf]", // matching that amber/khaki color
    }
  ];

  const resources = [
    { id: 1, icon: <HelpCircle className="w-4 h-4 text-blue-600" />, title: "FAQs", desc: "Quick answers to common questions about our services.", iconBg: "bg-blue-50" },
    { id: 2, icon: <BookOpen className="w-4 h-4 text-indigo-600" />, title: "User Manual", desc: "Detailed guide on how to use the portal effectively.", iconBg: "bg-indigo-50" },
    { id: 3, icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, title: "Public Policy", desc: "Official transparency and governance guidelines.", iconBg: "bg-emerald-50" },
    { id: 4, icon: <LifeBuoy className="w-4 h-4 text-rose-600" />, title: "Contact Support", desc: "Speak with a human representative for complex cases.", iconBg: "bg-rose-50" }
  ];

  return (
    <div className="w-full pb-10 relative">
      {/* Background that breaks out of container */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[#f8f9fb] z-0" style={{ marginLeft: 'calc(-50vw + 50%)', width: '100vw', marginTop: '-1.5rem' }} />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 mb-4 z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/50 text-blue-600 text-[11px] font-bold tracking-wide mb-8">
              <ShieldCheck className="w-3.5 h-3.5" /> Official City Service Portal
            </span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl sm:text-6xl md:text-[4rem] font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-5">
            Bridging citizens & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] uppercase">Administration</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto text-slate-500 text-[15px] leading-relaxed mb-10">
            A secure, automated hub for resolving civic infrastructure issues, built with institutional-grade <br className="hidden sm:block" /> security for absolute transparency.
          </motion.p>
          
          {/* Global Search Built-in */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-xl mx-auto w-full">
            <div className="flex items-center bg-white border border-slate-200 shadow-sm rounded-full overflow-hidden p-1.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
              <div className="pl-4 pr-1">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search public complaints by ID or location..." 
                className="w-full py-2.5 px-2 text-slate-700 outline-none text-[14px] bg-transparent placeholder:text-slate-400"
              />
              <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-7 py-2.5 rounded-full font-semibold text-[13px] transition-colors shadow-sm">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Bar */}
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-20 max-w-5xl mx-auto">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white rounded-[1rem] p-6 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] flex items-center justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1.5 uppercase">
                {metric.label}
              </p>
              <h3 className="text-[32px] font-extrabold text-[#111827] tracking-tight">{metric.value}</h3>
            </div>
            <div className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${metric.isPositive ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-[#475569]'}`}>
              <ArrowUpRight className="w-3 h-3"/>
              {metric.trend}
            </div>
          </div>
        ))}
      </motion.section>

      {/* Quick Actions */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Quick Actions</h2>
          {!isAuthenticated && (
            <button className="flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
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
              className="group cursor-pointer rounded-2xl p-6 border border-slate-100 bg-white hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${action.iconBg}`}>
                {action.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {action.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">
                {action.description}
              </p>
              <div className={`flex items-center text-xs font-bold ${action.textColor}`}>
                Action <Minus className="w-3 h-3 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Public Updates */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Public Updates</h2>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">View all updates</a>
        </div>
        
        <div className="space-y-4">
          {recentUpdates.map((update, idx) => (
            <motion.div 
              key={update.id}
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 + (idx * 0.1) }}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 cursor-pointer group"
            >
              <div className={`w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 border uppercase tracking-widest leading-loose ${update.boxBrandColor}`}>
                <span className="text-[9px] font-bold text-center px-2 opacity-80">R A S<br/>PORTAL</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold mb-1.5 flex gap-2 items-center tracking-wider">
                  <span className={update.tagColor}>{update.tag}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">{update.date}</span>
                </p>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors truncate">
                  {update.title}
                </h3>
                <p className="text-sm text-slate-500 truncate">
                  {update.desc}
                </p>
              </div>
              <div className="w-10 flex justify-end pr-2 text-slate-300 group-hover:text-blue-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">Helpful Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, idx) => (
            <motion.div 
              key={res.id}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 + (idx * 0.1) }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${res.iconBg} transform group-hover:scale-110 transition-transform`}>
                {res.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">{res.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{res.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Citizen Impact Stories */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6 text-center">Citizen Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative pt-12"
          >
            <Quote className="absolute top-6 left-6 w-6 h-6 text-blue-500/20 fill-blue-500/20" />
            <p className="text-slate-600 italic mb-8 text-sm leading-relaxed relative z-10">
              "Reported a broken water main on my way to work using the app. By the time I returned home, it was already cordoned off and being repaired. Truly impressive response time!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">JB</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">James B.</h4>
                <p className="text-xs text-slate-400">Resident since 2012</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative pt-12"
          >
            <Quote className="absolute top-6 left-6 w-6 h-6 text-indigo-500/20 fill-indigo-500/20" />
            <p className="text-slate-600 italic mb-8 text-sm leading-relaxed relative z-10">
              "The transparency of the resolution system gave me peace of mind. I could track my report every step of the way until the park bench was fixed. Highly recommend."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">SM</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Sarah M.</h4>
                <p className="text-xs text-slate-400">Active Community Leader</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stay Informed */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4 }}
        className="bg-[#0f172a] rounded-3xl p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Informed</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Receive weekly digests of city infrastructure status, planned maintenance, and community updates directly in your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-3 w-full">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="w-full sm:flex-1 bg-white/5 border border-white/10 outline-none text-white px-4 py-3 rounded-xl placeholder:text-slate-500 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all" 
            />
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap shadow-lg shadow-blue-900/50">
              Subscribe Now
            </button>
          </div>
          <p className="text-slate-500 text-[11px] mt-4 uppercase tracking-widest font-semibold">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
