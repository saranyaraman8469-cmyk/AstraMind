import { GlassCard } from "@/components/ui/glass-card";
import { Activity, AlertTriangle, CloudRain, Cpu, Radio, ShieldAlert } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the map because Leaflet requires the window object
const DigitalTwinMap = dynamic(() => import("@/components/DigitalTwinMap"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-slate-900 animate-pulse rounded-2xl border border-white/5" />
});

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-200 p-6 font-sans relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            AstraMind Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Live Digital Twin & Infrastructure Intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-slate-800 shadow-lg" />
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Stats & Alerts */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors">
              <Activity className="h-6 w-6 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">1,204</div>
              <div className="text-xs text-slate-400">Active Sensors</div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-2" />
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-slate-400">Critical Alerts</div>
            </GlassCard>
          </div>

          <GlassCard className="p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-orange-400" />
                Live Feed
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { time: "2 min ago", msg: "Pamban Bridge vibration anomaly detected.", type: "critical" },
                { time: "15 min ago", msg: "Cyclone alert issued for Tamil Nadu coast.", type: "weather" },
                { time: "1 hr ago", msg: "Normal traffic flow restored on NH-44.", type: "info" }
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 text-sm pb-3 border-b border-white/5 last:border-0">
                  <div className={`mt-0.5 rounded-full p-1 h-fit ${alert.type === 'critical' ? 'bg-red-500/20 text-red-400' : alert.type === 'weather' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {alert.type === 'critical' ? <Radio className="h-3 w-3" /> : alert.type === 'weather' ? <CloudRain className="h-3 w-3" /> : <Cpu className="h-3 w-3" />}
                  </div>
                  <div>
                    <p className="text-slate-300">{alert.msg}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          
        </div>

        {/* Center/Right Column: Digital Twin Map */}
        <div className="col-span-12 lg:col-span-9 h-[600px] lg:h-auto min-h-[600px]">
          <GlassCard className="h-full p-1 border-white/10 ring-1 ring-white/5 shadow-2xl relative">
            <div className="absolute top-4 left-4 z-[400] bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg">
              <h3 className="font-bold text-white text-sm">Real-time Asset Status</h3>
            </div>
            <DigitalTwinMap />
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
