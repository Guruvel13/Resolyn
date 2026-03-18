import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-slate-200 rotate-3">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-400 mt-2 font-medium">Resolyn Infrastructure Command</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                placeholder="admin@resolyn.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Master Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-200 transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-slate-800'}`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                AUTHENTICATE <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            Secure Entry Protocol v2.4
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
