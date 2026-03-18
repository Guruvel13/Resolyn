import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col pt-6 pb-12 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-12 lg:px-16">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Resolyn Analytics System. Secured by SSL & End-to-End Encryption.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
