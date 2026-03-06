/** @jsx jsx */
import { jsx } from 'hono/jsx';

export const LandingPage = ({ projectName }: { projectName: string }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{projectName} | Built with DevForge</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
        .cmd-palette { display: none; position: fixed; top: 20%; left: 50%; transform: translateX(-50%); width: 600px; max-width: 90%; background: white; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); z-index: 100; border: 1px solid #e2e8f0; }
        .cmd-palette.active { display: block; animation: slideUp 0.2s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('keydown', (e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('cmd-palette').classList.toggle('active');
          }
          if (e.key === 'Escape') {
            document.getElementById('cmd-palette').classList.remove('active');
          }
        });
      `}} />
    </head>
    <body className="bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Header */}
      <nav className="fixed w-full z-50 glass border-b border-slate-200 py-4 px-6 flex justify-between items-center">
        <div id="logo" className="text-2xl font-extrabold tracking-tighter text-blue-600">
          {projectName.toUpperCase()}
        </div>
        <div className="space-x-8 font-semibold text-slate-600 hidden md:flex">
          <a href="#features" id="nav-features" className="hover:text-blue-600 transition">Features</a>
          <a href="#api" id="nav-api" className="hover:text-blue-600 transition">API docs</a>
          <a href="/admin" id="nav-admin" className="hover:text-blue-600 transition">Admin Panel</a>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-bounce">
             ✨ v1.0.0 Now Live
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            The Future of SaaS is <span className="text-blue-600">Modular.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Welcome to your new powerhouse application. Scaffolded with <strong>Elite Standards</strong>, 
            built for <strong>Big O Performance</strong>, and optimized for <strong>Agentic AI</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/api/users/1" id="explorer-api" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl">
              Explorer API
            </a>
            <a href="https://github.com/ahmad-ubaidillah/devforge" target="_blank" className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm">
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-slate-500">Pre-configured modules ready for production in seconds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Modular Auth" desc="Stateless JWT sessions with Better Auth & Drizzle ORM." icon="🔐" />
            <FeatureCard title="Global Billing" desc="Stripe-powered subscriptions and multi-tenant billing loops." icon="💳" />
            <FeatureCard title="Auto-Analytics" desc="Server-side PostHog event tracking built into every route." icon="📊" />
            <FeatureCard title="Search Engine" desc="Meilisearch integration for unified search abstraction." icon="🔍" />
            <FeatureCard title="Queue Engine" desc="Asynchronous BullMQ task processing with Redis." icon="⚡" />
            <FeatureCard title="Premium Admin" desc="God-mode dashboard with real-time websocket metrics." icon="🛠️" />
          </div>
        </div>
      </section>

      {/* Command Palette Mock */}
      <div id="cmd-palette" className="cmd-palette overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center">
          <span className="text-slate-400 mr-3">🔍</span>
          <input type="text" placeholder="Search modules, entities, or help..." className="w-full outline-none text-slate-700 bg-transparent" />
        </div>
        <div className="p-2">
          <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer flex justify-between items-center group">
            <span className="text-slate-700">Go to Admin Dashboard</span>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-blue-600">CMD+A</span>
          </div>
          <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer flex justify-between items-center group">
            <span className="text-slate-700">Scaffold New Entity</span>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-blue-600">CMD+S</span>
          </div>
        </div>
        <div className="bg-slate-50 p-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">
          Press ESC to close
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 {projectName}. Built with <a href="https://github.com/ahmad-ubaidillah/devforge" className="text-blue-600 font-bold hover:underline">DevForge CLI</a>.</p>
      </footer>

      {/* Onboarding Tour Script */}
      <script src="https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.iife.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css"/>
      <script dangerouslySetInnerHTML={{ __html: `
        // Check if Onboarding Tour should be shown
        fetch('/api/onboarding/status')
          .then(res => res.json())
          .then(data => {
            if (data.tourEnabled && !data.onboarded && window.driver) {
              const d = window.driver.js.driver;
              const driverObj = d({
                showProgress: true,
                steps: [
                  { element: '#logo', popover: { title: 'Welcome!', description: 'This is your new DevForge application.', side: "left", align: 'start' }},
                  { element: '#nav-features', popover: { title: 'Modular Architecture', description: 'Everything is built as an independent plug-and-play module.', side: "bottom", align: 'start' }},
                  { element: '#nav-admin', popover: { title: 'Admin Panel', description: 'Manage your entire platform from here.', side: "bottom", align: 'start' }},
                  { element: '#cmd-palette', popover: { title: 'Elite DX', description: 'Press CMD+K anywhere to launch the command palette.', side: "top", align: 'start' }},
                  { element: '#explorer-api', popover: { title: 'API Explorer', description: 'Test your backend endpoints instantly.', side: "top", align: 'center' }},
                ],
                onDestroyStarted: () => {
                  fetch('/api/onboarding/complete', { method: 'POST' });
                  driverObj.destroy();
                }
              });
              
              // Slight delay to ensure DOM is fully ready
              setTimeout(() => { driverObj.drive(); }, 500);
            }
          })
          .catch(err => console.error('Onboarding init failed:', err));
      `}} />
    </body>
  </html>
);

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 hover:bg-white transition-all group">
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
