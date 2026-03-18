import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  User, 
  ShieldAlert, 
  MapPin, 
  Smartphone, 
  LockKeyhole, 
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DotGrid from '../components/react-bits/DotGrid';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    district: '',
  });
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteSignup = (e) => {
    e.preventDefault();
    // Logic for verification would go here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative px-4 overflow-hidden py-10">
      {/* Background DotGrid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#cbd5e1"
          activeColor="#4F46E5"
          proximity={120}
          speedTrigger={100}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white/75 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 mb-6">
                <User className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Join the Portal</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">Citizen Registration</p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Information cards */}
                <div className="bg-indigo-50/50 rounded-2xl p-4 flex gap-4 border border-indigo-100/50 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <EyeOff className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                    Your personal information is <span className="font-bold underline">never shared publicly</span>. We only use this for official city verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Identity Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. James Bennett"
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Connectivity</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Smartphone className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        placeholder="Verification number"
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Residential District</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                      <select
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select District</option>
                        <option value="west">West District</option>
                        <option value="east">East District</option>
                        <option value="north">North District</option>
                        <option value="south">South District</option>
                        <option value="central">Central District</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all group active:scale-[0.98] mt-4"
                >
                  Create Secure Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleCompleteSignup} className="space-y-6">
                <div className="text-center mb-8">
                  <p className="text-xs text-slate-500 mb-1">Verify your identity</p>
                  <p className="text-sm font-bold text-slate-900 tracking-tight">Enter the 6-digit code sent to {formData.phoneNumber}</p>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Security Code</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="· · · · · ·"
                      className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm tracking-[0.5em] font-black focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-center placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 mb-6">
                   <div className="flex items-center gap-3 mb-2">
                     <ShieldCheck className="w-4 h-4 text-emerald-600" />
                     <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Privacy Guard Enabled</h4>
                   </div>
                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-loose">
                     By continuing, you agree to our institutional accountability protocols and public transparency guidelines.
                   </p>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all group active:scale-[0.98]"
                >
                  Finish Registration
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                  >
                    Go Back & Edit
                  </button>
                </div>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                Already registered? {' '}
                <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login Securely</Link>
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 flex items-center justify-center gap-8">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
              Active Protocol: Multi-layered Citizen Anonymity Verification
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
