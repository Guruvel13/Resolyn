import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShieldAlert,
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
  Minus, 
  EyeOff, 
  UserCheck, 
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import DotGrid from '../components/react-bits/DotGrid';

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[700px] bg-[#f8f9fb] z-0 overflow-hidden" style={{ marginTop: '-1.5rem' }}>
        <div className="absolute inset-0 opacity-40">
          <DotGrid
            dotSize={4}
            gap={18}
            baseColor="#cbd5e1"
            activeColor="#0256eb"
            proximity={120}
            speedTrigger={100}
            shockRadius={250}
            shockStrength={5}
            maxSpeed={5000}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f9fb]/20 to-[#f8f9fb]"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 mb-4 z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 text-blue-700 text-[10px] font-black tracking-[0.15em] mb-10 uppercase">
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
          
        </div>
      </section>

      {/* Metrics Bar */}
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 -mt-10 mb-20">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between hover:translate-y-[-4px] transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1.5 uppercase">
                {metric.label}
              </p>
              <h3 className="text-[32px] font-extrabold text-[#111827] tracking-tight">{metric.value}</h3>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${metric.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
              <ArrowUpRight className="w-3 h-3"/>
              {metric.trend}
            </div>
          </div>
        ))}
      </motion.section>

      {/* How It Works Section */}
      <section className="mb-24 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10 hidden md:block"></div>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Resolution Journey</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">Your reports trigger an automated workflow connecting directly to city maintenance teams.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Submit Securely', desc: 'File your report with photos and GPS. Your identity is automatically shielded.', icon: <FileText className="w-6 h-6 text-blue-600" /> },
            { step: '02', title: 'Admin Verification', desc: 'City officials verify the report and assign it to the relevant department.', icon: <UserCheck className="w-6 h-6 text-indigo-600" /> },
            { step: '03', title: 'Ground Action', desc: 'Maintenance crews resolve the issue. You track every update in real-time.', icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-white">
                {item.step}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Privacy & Safety Trust Section */}
      <section className="mb-24 py-16 px-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -ml-36 -mb-36"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold tracking-wide mb-6">
              <ShieldAlert className="w-3.5 h-3.5" /> Safety First
            </div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Your Identity is Shielded. <br/>Your Impact is Real.</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              We've built Resolyn with a privacy-first architecture. When you report an issue, your personal data is separated from the public report viewed by officials and other citizens.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <EyeOff className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Masked Reporting</h4>
                  <p className="text-blue-100 text-sm">Public-facing reports only show the issue details, location, and status. Reporter identity remains hidden.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <LockKeyhole className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Encrypted Data</h4>
                  <p className="text-blue-100 text-sm">Institutional-grade encryption ensures your private data never leaves our secure server infrastructure.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Safe Communication</h4>
                  <p className="text-blue-100 text-sm">Messaging with officials happens through a secure, anonymized gateway to protect your privacy.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
               <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">R</div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider text-xs">Security Status</h4>
                      <p className="text-[10px] text-blue-200">System Monitoring: Active</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">SECURE</div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">AES-256 Encryption</span>
                       <span className="text-[10px] text-emerald-400 font-bold">VERIFIED</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-blue-400"></motion.div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Anonymity Guard</span>
                       <span className="text-[10px] text-emerald-400 font-bold">ENABLED</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, delay: 1.2 }} className="h-full bg-blue-400"></motion.div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Official Verification</span>
                       <span className="text-[10px] text-emerald-400 font-bold">TRUSTED</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, delay: 1.4 }} className="h-full bg-blue-400"></motion.div>
                    </div>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center flex-col gap-3">
                  <ShieldCheck className="w-12 h-12 text-blue-400 opacity-50" />
                  <p className="text-[11px] text-blue-200/60 uppercase font-bold tracking-[0.2em]">Institutional-Grade Security</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Engage with Your Community</h2>
            <p className="text-slate-500 text-sm">Quick access to essential services and reporting tools.</p>
          </div>
          {!isAuthenticated && (
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
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
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Public Progress</h2>
            <p className="text-slate-500 text-sm">Transparency in action: see what we are fixing right now.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-full">
            View all updates <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {recentUpdates.map((update, idx) => (
            <motion.div 
              key={update.id}
              initial={{ x: -20, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white group cursor-pointer p-5 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className={`w-full md:w-28 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 border uppercase tracking-[0.2em] leading-loose ${update.boxBrandColor} transition-transform group-hover:scale-95`}>
                <span className="text-[9px] font-black text-center px-4 opacity-90">R A S<br/>PORTAL</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-3 items-center mb-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-50 ${update.tagColor} tracking-widest`}>{update.tag}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{update.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {update.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                  {update.desc}
                </p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full border border-slate-100 items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Citizen Resource Kit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, idx) => (
            <motion.div 
              key={res.id}
              initial={{ y: 20, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${res.iconBg} transform group-hover:rotate-6 transition-transform`}>
                {res.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{res.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{res.desc}</p>
              <div className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Citizen Impact Stories */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-12 text-center">Voices of Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              name: 'James B.', 
              role: 'Resident since 2012', 
              initials: 'JB', 
              color: 'blue',
              text: "Reported a broken water main on my way to work using the app. By the time I returned home, it was already cordoned off and being repaired. Truly impressive response time!" 
            },
            { 
              name: 'Sarah M.', 
              role: 'Active Community Leader', 
              initials: 'SM', 
              color: 'indigo',
              text: "The transparency of the resolution system gave me peace of mind. I could track my report every step of the way until the park bench was fixed. Highly recommend." 
            }
          ].map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-slate-50/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-200/50 relative group"
            >
              <Quote className={`absolute top-8 right-10 w-12 h-12 text-${story.color}-500/5 transition-transform group-hover:scale-125`} />
              <p className="text-slate-600 text-[15px] leading-relaxed mb-8 relative z-10 italic">
                "{story.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-${story.color}-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-${story.color}-500/20`}>
                  {story.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{story.name}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
