import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Settings as SettingsIcon, LogOut, Car, Menu, X, ExternalLink, Shield, Compass } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';
import logoImg from '../../assets/citycabs24-logo.png';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { phone, helpPhone } = useSettingsStore();
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-400/40 p-0.5 shadow-md bg-white flex items-center justify-center">
            <img src={logoImg} alt="CityCabs24 Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-display font-black text-lg tracking-tight text-white leading-tight">
              CityCabs<span className="text-indigo-400">24</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-indigo-500/90">
              Admin Console
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pb-2 pt-1">
          Operations
        </div>
        <NavLink
          to="/admin"
          end
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive
                ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard & Bookings
        </NavLink>

        <NavLink
          to="/admin/settings"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive
                ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <SettingsIcon className="w-4 h-4" />
          Contact & Site Settings
        </NavLink>

        <NavLink
          to="/admin/tours"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive
                ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Compass className="w-4 h-4" />
          Manage Tours & Pricing
        </NavLink>

        <div className="pt-6 pb-2 px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">
          Public Site
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <span className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-indigo-400" />
            Open Website
          </span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Live</span>
        </a>
      </nav>

      {/* Support Info & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="text-slate-400 text-[11px]">Admin Help & Support Line:</div>
          <a href={`tel:+91${helpPhone || '8380803217'}`} className="font-bold text-indigo-400 mt-0.5 block hover:underline">
            +91 {helpPhone || '8380803217'}
          </a>
          <a
            href={`https://wa.me/91${helpPhone || '8380803217'}?text=Hello%20need%20help%20with%20CityCabs24%20Admin`}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-1 font-medium"
          >
            WhatsApp Support
          </a>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2.5 w-full px-3.5 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl text-sm font-semibold transition border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Admin Console</h1>
              <p className="text-xs text-slate-500 hidden sm:block">CityCabs24 Driver & Customer Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Administrator</div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
