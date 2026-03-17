import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Clock, CheckCircle2, AlertCircle, MessageSquare, Target, UserCheck, Wrench, Star, RotateCcw } from 'lucide-react';

const ticketStatuses = [
  { id: 'pending', label: 'Pending Review', icon: <Target className="w-5 h-5 text-yellow-600" />, color: 'bg-yellow-100 border-yellow-300 text-yellow-700 font-medium' },
  { id: 'assigned', label: 'Official Assigned', icon: <UserCheck className="w-5 h-5 text-blue-600" />, color: 'bg-blue-100 border-blue-300 text-blue-700 font-medium' },
  { id: 'in_progress', label: 'On-Site Fix', icon: <Wrench className="w-5 h-5 text-indigo-600" />, color: 'bg-indigo-100 border-indigo-300 text-indigo-700 font-medium' },
  { id: 'resolved', label: 'Resolved', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, color: 'bg-emerald-100 border-emerald-300 text-emerald-700 font-medium' }
];

const mockTickets = [
  {
    id: "RES-9801",
    department: "Water & Supply",
    issue: "Massive pipe burst flooding main road.",
    date: "12 Oct 2026, 09:30 AM",
    status: 'in_progress',
    officer: "Rahul Sharma (Ward 4 Engineer)",
    location: "Koramangala 4th Block"
  },
  {
    id: "RES-9705",
    department: "Streetlights",
    issue: "Pole #4521 dead for 3 weeks.",
    date: "10 Oct 2026, 08:15 PM",
    status: 'resolved',
    officer: "Nitin B. (Electrical Dept)",
    location: "HSR Layout Sector 2",
    rating: null
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(mockTickets);
  const [ratingInput, setRatingInput] = useState({}); // { ticketId: number }

  const handleRating = (ticketId, stars) => {
    setRatingInput({...ratingInput, [ticketId]: stars});
  };

  const submitRating = (ticketId) => {
    // API logic to save rating
    setTickets(tickets.map(t => t.id === ticketId ? {...t, rating: ratingInput[ticketId]} : t));
  };

  const renderStepper = (currentStatus) => {
    const currentIndex = ticketStatuses.findIndex(s => s.id === currentStatus);
    
    return (
      <div className="flex items-center justify-between w-full mt-4 relative">
        <div className="absolute left-0 top-1/2 -mt-[1px] w-full h-[2px] bg-slate-200 z-0"></div>
        {ticketStatuses.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isLastStatus = idx === ticketStatuses.length - 1;
          const statusColors = isCompleted 
            ? step.color.split(' ')[0] // getting background color
            : 'bg-slate-100';

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all 
                  ${isCompleted ? step.color + ' border-current' : 'border-slate-300 bg-white text-slate-300'}`}
              >
                {isCompleted ? step.icon : <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider absolute top-12 left-1/2 -translate-x-1/2 text-center w-24 leading-tight ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Activity</h1>
          <p className="text-slate-500 mt-1">Track and manage your filed civic reports.</p>
        </div>
        <button 
          onClick={() => navigate('/file-report')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all text-sm flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> New Report
        </button>
      </div>

      <div className="space-y-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Core Details */}
            <div className="p-6 lg:p-8 flex-1 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-md tracking-widest uppercase border border-slate-200">
                  {ticket.id}
                </span>
                <span className="text-sm font-semibold text-slate-500 flex items-center gap-1">
                   <Clock className="w-4 h-4" /> {ticket.date}
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">{ticket.issue}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                   <Target className="w-4 h-4 text-indigo-500" /> {ticket.department}
                   <span className="text-slate-300 mx-1">|</span>
                   <MapPin className="w-4 h-4 text-rose-500" /> {ticket.location}
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="pt-8 pb-10 w-full max-w-lg mx-auto lg:max-w-none">
                 {renderStepper(ticket.status)}
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="p-6 lg:p-8 bg-slate-50 w-full lg:w-80 flex flex-col justify-center space-y-4 relative">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Officer</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold font-serif text-lg">
                    {ticket.officer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{ticket.officer}</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Verified Gov
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => navigate(`/chat/${ticket.id}`)}
                  className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-5 h-5" /> Direct Message
                </button>
              </div>

              {/* Feedback UI if resolved */}
              {ticket.status === 'resolved' && (
                <div className="mt-4 pt-4 border-t border-slate-200 text-center animate-in slide-in-from-top-2 duration-300">
                  {ticket.rating ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Rated {ticket.rating} Stars
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-800">Rate the resolution</p>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                           <Star 
                             key={star}
                             onClick={() => handleRating(ticket.id, star)}
                             className={`w-7 h-7 cursor-pointer transition-transform hover:scale-110 
                               ${(ratingInput[ticket.id] || 0) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                           />
                        ))}
                      </div>
                      {ratingInput[ticket.id] && (
                        <button onClick={() => submitRating(ticket.id)} className="w-full mt-2 bg-slate-900 text-white text-xs py-2 font-bold rounded-lg hover:bg-slate-800 transition-colors">
                          Submit Rating
                        </button>
                      )}
                    </div>
                  )}

                  <button className="w-full flex items-center justify-center gap-2 text-rose-600 hover:bg-rose-50 text-xs font-bold py-2.5 rounded-lg mt-3 border border-transparent hover:border-rose-200 transition-all">
                    <RotateCcw className="w-4 h-4" /> Re-open Ticket (48h left)
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
