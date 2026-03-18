import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const result = isLogin 
        ? await login(email, password)
        : await register(name, email, password);
        
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100 border border-indigo-50 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-200">
            {isLogin ? <User size={32} /> : <UserPlus size={32} />}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join Resolyn'}
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            {isLogin ? 'Access your citizen dashboard' : 'Create an account to report issues'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium text-slate-900"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium text-slate-900"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium text-slate-900"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200'}`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'} <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
