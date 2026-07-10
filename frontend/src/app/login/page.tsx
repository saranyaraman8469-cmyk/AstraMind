"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, KeyRound, User, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050B14] relative overflow-hidden transition-colors duration-500">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-emerald-500/20 dark:bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
          
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 transform rotate-12">
              <Shield className="h-8 w-8 text-white -rotate-12" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
              AstraMind
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Secure AI Gateway</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Username or Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
                  placeholder="admin@astramind.gov.in"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  <KeyRound className="h-5 w-5" />
                  Authenticate
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">New operator? </span>
            <Link href="/signup" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Request Access
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
