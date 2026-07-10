"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, UserPlus, User, Lock, Mail, Building, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    department: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock registration
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050B14] relative overflow-hidden transition-colors duration-500 py-12">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/20 dark:bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg p-8 relative z-10">
        <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
          
          <div className="flex flex-col items-center mb-6">
            <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 transform -rotate-6">
              <UserPlus className="h-7 w-7 text-white rotate-6" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Request Access
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Join the AstraMind intelligence network.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" name="username" required onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 dark:text-white"
                    placeholder="officer_01"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Department</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select 
                    name="department" required onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 dark:text-white appearance-none"
                  >
                    <option value="" disabled selected>Select Dept...</option>
                    <option value="disaster">Disaster Mgmt</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="medical">Medical / Health</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="email" name="email" required onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 dark:text-white"
                  placeholder="name@gov.in"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="password" name="password" required onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  Submit Registration
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">Already authorized? </span>
            <Link href="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Authenticate here
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
