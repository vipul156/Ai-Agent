import React from "react";

// ToolChain Dashboard
// Single-file React component using Tailwind CSS
// Usage: place this component in a React app (Create React App, Vite, Next).
// Requirements: Tailwind CSS configured. lucide-react icons optional — fallback simple svg used.

const agents = [
  { id: 1, name: "Cricket Agent", icon: "bat", meta: "Last updated: 3 days ago" },
  { id: 2, name: "India agent", icon: "map", meta: "Last updated: 6 days ago" },
];

function Icon({ name, className = "w-8 h-8" }) {
  // small icon switch — keep minimal and self-contained
  if (name === "bat")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="6" rx="2" fill="url(#g)" />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#ff9a76" />
            <stop offset="1" stopColor="#ffcd6b" />
          </linearGradient>
        </defs>
      </svg>
    );
  if (name === "map")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6v12l5-2 5 2 6-3V6l-6 3-5-2L4 6z" fill="url(#m)" />
        <defs>
          <linearGradient id="m" x1="0" x2="1">
            <stop offset="0" stopColor="#5eead4" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#cbd5e1" strokeWidth="1.5" fill="white" />
    </svg>
  );
}

export default function ToolChainDashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-500 to-indigo-400 flex items-center justify-center shadow-lg">
              <span className="font-bold">TC</span>
            </div>
            <h1 className="font-semibold text-lg">ToolChain</h1>
          </div>

          <nav className="space-y-3 text-slate-300">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-full bg-gradient-to-r from-teal-400 to-violet-400 shadow-md text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="white"/></svg>
              <span className="font-medium">Dashboard</span>
            </button>

            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>AI Agent</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#cbd5e1" strokeWidth="1.2"/></svg>
              <span>Data</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#cbd5e1" strokeWidth="1.2"/></svg>
              <span>Pricing</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#cbd5e1" strokeWidth="1.2"/><path d="M6 20c1.5-3 4.5-4 6-4s4.5 1 6 4" stroke="#cbd5e1" strokeWidth="1.2"/></svg>
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div className="mb-2">
          <div className="text-slate-300 text-sm mb-3">75/100 credits used</div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
            <div className="h-2 rounded-full" style={{ width: '75%', background: 'linear-gradient(90deg,#7dd3fc, #86efac)' }} />
          </div>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-md">Upgrade to Pro</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div />
            <div className="w-10 h-10 rounded-full bg-white shadow-md overflow-hidden">
              <img alt="avatar" src="https://i.pravatar.cc/100" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-7">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Build Powerful AI Agents with Ease</h2>
            <p className="text-slate-600 mb-6">Craft intelligent workflow instantly</p>

            <div className="mb-8">
              <button className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-blue-900 text-white shadow-inner">
                <span className="text-2xl">+</span>
                <span className="font-medium">Create New Agent</span>
              </button>
            </div>

            <div className="mb-4">
              <div className="inline-flex bg-white/30 backdrop-blur rounded-full p-1 shadow-sm">
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-300 to-indigo-300 text-white font-medium">My Agents</button>
                <button className="px-4 py-2 rounded-full text-slate-500">Templates</button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              {agents.map((a) => (
                <div key={a.id} className="bg-white rounded-xl p-6 shadow-xl relative">
                  <div className="absolute top-4 right-4 opacity-60 hover:opacity-100 cursor-pointer rounded-full p-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="5" cy="12" r="1.6" fill="#e2e8f0"/><circle cx="12" cy="12" r="1.6" fill="#e2e8f0"/><circle cx="19" cy="12" r="1.6" fill="#e2e8f0"/></svg>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#fff7ed, #fff1f2)' }}>
                      <Icon name={a.icon} />
                    </div>

                    <div>
                      <div className="text-lg font-semibold text-slate-800">{a.name}</div>
                      <div className="text-sm text-slate-400">{a.meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 flex items-center justify-center">
            {/* Illustration placeholder — stylized brain/network */}
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 600 400" className="w-4/5 h-auto">
                <defs>
                  <linearGradient id="b1" x1="0" x2="1">
                    <stop offset="0" stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                <g>
                  <path d="M120,200 C140,120 220,80 300,120 C380,160 420,240 360,300 C300,360 180,340 140,280 C100,220 100,220 120,200 Z" fill="url(#b1)" opacity="0.95" />
                  <g transform="translate(320,150)">
                    <rect x="0" y="40" width="160" height="12" rx="6" fill="#c7d2fe" />
                    <circle cx="10" cy="46" r="8" fill="#93c5fd" />
                    <circle cx="50" cy="46" r="8" fill="#ffd6a5" />
                    <circle cx="110" cy="46" r="8" fill="#bde4ff" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
