'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Lock, ShieldCheck, KeyRound, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const EXPECTED_USER = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
  const EXPECTED_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'opnixlabs2026!';

  useEffect(() => {
    setMounted(true);
    const storedAuth =
      sessionStorage.getItem('opnixlabs_admin_auth') === 'true' ||
      localStorage.getItem('opnixlabs_admin_auth') === 'true';

    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: string, pass: string): boolean => {
    if (user.trim() === EXPECTED_USER && pass === EXPECTED_PASS) {
      sessionStorage.setItem('opnixlabs_admin_auth', 'true');
      localStorage.setItem('opnixlabs_admin_auth', 'true');
      document.cookie = 'opnixlabs_admin_auth=true; path=/; max-age=86400';
      setIsAuthenticated(true);
      setError(null);
      return true;
    }
    setError('Invalid admin credentials.');
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('opnixlabs_admin_auth');
    localStorage.removeItem('opnixlabs_admin_auth');
    document.cookie = 'opnixlabs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(usernameInput, passwordInput);
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Checking authentication permissions...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <div className="py-16 px-4 flex items-center justify-center selection:bg-blue-500 selection:text-slate-950">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <Image
                  src="/logo.webp"
                  alt="OpnixLabs Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain rounded-md"
                />
                <h2 className="text-xl font-extrabold text-white">
                  Opnix<span className="gradient-text">Labs</span> Article Publisher
                </h2>
              </div>
              <p className="text-slate-400 text-xs">
                Restricted area. Enter admin credentials to publish articles.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase text-slate-400">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase text-slate-400">
                  Admin Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Publisher Console</span>
              </button>
            </form>
          </div>
        </div>
      </AdminAuthContext.Provider>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
