import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/30 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Resolyn
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Empowering citizens through geospatial intelligence.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
