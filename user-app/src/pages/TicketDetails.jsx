import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Check, 
  RefreshCw, 
  Download, 
  MessageSquare, 
  Paperclip, 
  AtSign, 
  Send, 
  AlertTriangle, 
  PhoneCall, 
  User, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

const TicketDetails = () => {
  const navigate = useNavigate();

  // Reference UI Timeline steps
  const timelineSteps = [
    {
      id: 1,
      title: "Filed",
      time: "Oct 24, 09:00 AM",
      desc: "Ticket successfully initialized and logged in queue.",
      status: "completed"
    },
    {
      id: 2,
      title: "Assigned",
      time: "Oct 24, 10:30 AM",
      desc: <>Assigned to <span className="text-blue-600 font-semibold">Alex Chen</span><br/><span className="text-slate-500">(Senior DevSecOps)</span></>,
      status: "completed"
    },
    {
      id: 3,
      title: "Under Review",
      subInfo: "In Progress • Active now",
      desc: "System migration and security audits are currently being performed.",
      status: "current"
    },
    {
      id: 4,
      title: "Resolved",
      desc: "Pending final verification",
      status: "upcoming"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-12">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pt-4">
        <div>
          <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Ticket Status: Active</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
            #TK-8842 Infrastructure Deployment
          </h1>
          <p className="text-slate-500 font-medium">
            SaaS Enterprise Division <span className="mx-1">•</span> High Priority
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#111827] text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm shadow-blue-500/20">
            Update Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Tracking Timeline */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2 mb-8">
              <BarChart2 className="w-5 h-5 text-[#2563EB]" /> Live Tracking Timeline
            </h2>

            <div className="relative pl-3 flex-1">
              {/* Vertical line connecting steps */}
              <div className="absolute top-2 bottom-6 left-5 border-l-2 border-slate-200 -z-0"></div>
              {/* Highlight line for completed part */}
              <div className="absolute top-2 bottom-1/2 left-5 border-l-2 border-[#2563EB] -z-0" style={{ bottom: '45%' }}></div>

              <div className="space-y-10 relative z-10">
                {timelineSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 items-start relative bg-white">
                    {/* Status Icons */}
                    <div className="mt-0.5 z-10 bg-white">
                      {step.status === "completed" ? (
                        <div className="w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : step.status === "current" ? (
                        <div className="w-6 h-6 -ml-0.5 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200 shadow-sm relative z-20">
                          <RefreshCw className="w-3.5 h-3.5 text-[#2563EB] animate-spin-slow" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 -ml-0.5 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center relative z-20">
                          <Check className="w-3 h-3 text-slate-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Step details */}
                    <div className="flex-1 -mt-0.5">
                      <div className="flex flex-col mb-1">
                        <h3 className={`text-sm font-bold ${step.status === "current" ? "text-[#2563EB]" : (step.status === "completed" ? "text-[#111827]" : "text-slate-400")}`}>
                          {step.title}
                        </h3>
                        {step.time && <span className="text-[11px] text-slate-500 font-medium">{step.time}</span>}
                        {step.subInfo && <span className="text-[11px] font-semibold text-[#2563EB]">{step.subInfo}</span>}
                      </div>
                      <p className={`text-xs leading-relaxed ${step.status === "upcoming" ? "text-slate-400" : "text-slate-600"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Box */}
            <div className="mt-8 bg-[#ECFDF5] rounded-xl p-4 border border-[#D1FAE5] flex items-center justify-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#059669]">Expected SLA</span>
              <span className="text-sm font-bold text-[#059669]">2h 15m remaining</span>
            </div>
          </div>
        </div>

        {/* Right Column: Communication Log */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[700px]">
            {/* Log Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-10 rounded-t-2xl">
              <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2563EB] fill-[#2563EB]/10" /> Communication Log
              </h2>
              <span className="bg-slate-100 text-[#111827] text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
                3 New Messages
              </span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              
              {/* Message 1 */}
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100 shadow-sm mt-6">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 max-w-[85%]">
                  <div className="flex items-baseline gap-2 mb-1.5 ml-1">
                    <span className="font-bold text-sm text-[#111827]">Alex Chen (Official)</span>
                    <span className="text-[10px] text-slate-400 font-medium">10:45 AM</span>
                  </div>
                  <div className="bg-[#f0f2f5] text-[#111827] text-sm p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200/60 leading-relaxed">
                    I've initiated the primary audit on the node cluster. We're seeing some latency spikes in the Frankfurt region. Investigating now.
                  </div>
                </div>
              </div>

              {/* System Note */}
              <div className="flex items-center justify-center my-6">
                <span className="bg-[#f0f2f5] border border-slate-200/80 text-slate-500 text-[11px] font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  System: Deployment script v2.4 started
                </span>
              </div>

              {/* Message 2 (Critical) */}
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 border border-indigo-100 shadow-sm mt-6">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 max-w-[85%]">
                  <div className="flex items-baseline gap-2 mb-1.5 ml-1">
                    <span className="font-bold text-sm text-[#111827]">Sarah Williams (Ops Director)</span>
                    <span className="text-[10px] text-slate-400 font-medium">11:12 AM</span>
                  </div>
                  <div className="relative">
                    {/* Critical Indicator Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-2xl z-20"></div>
                    <div className="bg-[#f0f2f5] text-[#111827] text-sm p-4 pl-5 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200/60 leading-relaxed relative overflow-hidden">
                      <span className="font-bold text-[#111827]">Critical:</span> We must ensure that the backup DB is fully synced before finalizing the migration. Proceed with caution.
                    </div>
                  </div>
                </div>
              </div>

              {/* Message 3 (You) */}
              <div className="flex gap-4 justify-end">
                <div className="flex-1 flex flex-col items-end max-w-[85%]">
                  <div className="flex items-baseline gap-2 mb-1.5 mr-1">
                    <span className="text-[10px] text-slate-400 font-medium">11:20 AM</span>
                    <span className="font-bold text-sm text-[#111827]">You</span>
                  </div>
                  <div className="bg-[#2563EB] text-white text-sm p-4 rounded-2xl rounded-tr-sm shadow-sm leading-relaxed mb-1.5">
                    Understood, Sarah. The local dev team has verified the sync. We are ready for the switch whenever Alex gives the green light.
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold mr-1">
                    Read by Alex <Check className="w-3 h-3" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#f4ebd0] flex items-center justify-center flex-shrink-0 text-[#a39462] font-semibold text-sm shadow-sm mt-6">
                  YOU
                </div>
              </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="bg-[#f8f9fb] border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex flex-col">
                <textarea 
                  placeholder="Type your message to officials..." 
                  className="w-full bg-transparent outline-none p-3 text-sm text-[#111827] placeholder:text-slate-400 resize-none h-16"
                ></textarea>
                <div className="flex justify-between items-center px-2 pb-1">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-[#111827] transition-colors">
                      <Paperclip className="w-3 h-3" /> Attach File
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-[#111827] transition-colors">
                      <AtSign className="w-3 h-3" /> Mention Official
                    </button>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center text-[#2563EB] hover:bg-blue-50 rounded-full transition-colors">
                    <Send className="w-5 h-5 translate-x-px" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50/50 p-4 rounded-2xl shadow-sm transition-all flex items-center gap-4 text-left group">
              <div className="min-w-10 w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center border border-red-100 group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[13px] text-[#111827]">Escalate Issue</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Notify senior management</p>
              </div>
            </button>
            <button className="flex-1 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 p-4 rounded-2xl shadow-sm transition-all flex items-center gap-4 text-left group">
              <div className="min-w-10 w-10 h-10 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[13px] text-[#111827]">Request Callback</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Speak with Alex Chen</p>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDetails;
