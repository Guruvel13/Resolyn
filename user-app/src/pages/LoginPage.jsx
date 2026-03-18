import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  LockKeyhole, 
  ChevronRight,
  Fingerprint,
  Lock,
  Smartphone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DotGrid from '../components/react-bits/DotGrid';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Logic for verification would go here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4 overflow-hidden">
      {/* Background DotGrid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#cbd5e1"
          activeColor="#2563eb"
          proximity={120}
          speedTrigger={100}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.1em]">Secure Citizen Access</p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Smartphone className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all group active:scale-[0.98]"
                >
                  Send OTP Code
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-xs text-slate-500 mb-1">We've sent a 6-digit code to</p>
                  <p className="text-sm font-bold text-slate-900 tracking-tight">{phoneNumber}</p>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Verification Code</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="0 0 0 0 0 0"
                      className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm tracking-[0.5em] font-black focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-center"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all group active:scale-[0.98]"
                >
                  Verify & Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                  >
                    Change Number
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                New to Resolyn? {' '}
                <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link>
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 p-6 flex items-center justify-center gap-4 border-t border-slate-100">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white"><Lock className="w-3 h-3"/></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Institutional-Grade Encryption Active</p>
          </div>
        </div>

        {/* Floating security badge */}
        <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
           <div className="flex items-center gap-1.5 font-black text-slate-900 text-[10px] tracking-widest uppercase">
             <Fingerprint className="w-3.5 h-3.5"/> GDPR Compliance
           </div>
           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
           <div className="flex items-center gap-1.5 font-black text-slate-900 text-[10px] tracking-widest uppercase">
             <Smartphone className="w-3.5 h-3.5"/> 2FA Protocol
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
