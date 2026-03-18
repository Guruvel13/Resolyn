import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  FileText,
  ChevronRight,
  Clock,
  Target,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.get(`/complaints/${id}`);
        setComplaint(data);
      } catch (err) {
        console.error('Failed to fetch complaint details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900">Ticket not found</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-4 text-indigo-600 font-bold uppercase">Return to Dashboard</button>
      </div>
    );
  }

  const timelineSteps = [
    {
      id: 1,
      title: "Filed",
      time: new Date(complaint.createdAt).toLocaleString(),
      desc: "Ticket successfully initialized and logged in queue.",
      status: "completed"
    },
    {
      id: 2,
      title: "Assigned",
      time: complaint.assignedOfficial ? "Matched with Provider" : "Awaiting Official",
      desc: complaint.assignedOfficial ? `Assigned to ${complaint.assignedOfficial}` : "System is searching for an available officer.",
      status: complaint.assignedOfficial ? "completed" : "current"
    },
    {
      id: 3,
      title: "Under Review",
      subInfo: complaint.status === 'In Progress' ? "In Progress • Active now" : "",
      desc: complaint.status === 'In Progress' ? "Action is being taken on site." : "Pending field inspection.",
      status: complaint.status === 'In Progress' ? "current" : (complaint.status === 'Resolved' ? 'completed' : 'upcoming')
    },
    {
      id: 4,
      title: "Resolved",
      desc: complaint.status === 'Resolved' ? "Issue has been addressed." : "Final verification required",
      status: complaint.status === 'Resolved' ? "completed" : "upcoming"
    }
  ];

  return (
    <div className="w-full mx-auto mb-12 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pt-4">
        <div>
          <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Ticket Status: {complaint.status}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
            #{complaint._id.substring(0, 8)} {complaint.title}
          </h1>
          <p className="text-slate-500 font-medium">
            {complaint.department} <span className="mx-1">•</span> {complaint.priority} Priority
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#111827] text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm shadow-blue-500/20"
          >
            Dashboard
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
              <div className="absolute top-2 bottom-6 left-5 border-l-2 border-slate-200 -z-0"></div>
              <div className="space-y-10 relative z-10">
                {timelineSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 items-start relative bg-white">
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
          </div>
        </div>

        {/* Right Column: Communication Log */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-10 rounded-t-2xl">
              <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2563EB] fill-[#2563EB]/10" /> Communication Log
              </h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
               <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Secure channel initiated. {complaint.assignedOfficial ? 'Waiting for responses...' : 'Officer assignment pending.'}</p>
               </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="bg-[#f8f9fb] border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex flex-col">
                <textarea 
                  placeholder="Type your message to officials..." 
                  className="w-full bg-transparent outline-none p-3 text-sm text-[#111827] placeholder:text-slate-400 resize-none h-16 disabled:opacity-50"
                  disabled={!complaint.assignedOfficial}
                ></textarea>
                <div className="flex justify-between items-center px-2 pb-1">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-[#111827] transition-colors disabled:opacity-50" disabled={!complaint.assignedOfficial}>
                      <Paperclip className="w-3 h-3" /> Attach File
                    </button>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center text-[#2563EB] hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50" disabled={!complaint.assignedOfficial}>
                    <Send className="w-5 h-5 translate-x-px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
