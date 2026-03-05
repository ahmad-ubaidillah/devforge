import React, { useEffect, useState } from 'react';
import { Users, Activity, Settings, Database, Server } from 'lucide-react';
import { OverviewChart } from '../components/OverviewChart';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    activeTenants: 0,
    totalUsers: 0,
    sysHealth: 'checking...',
  });

  useEffect(() => {
    // 1. We connect to our WebSocket Plugin (Sprint 7)
    const ws = new WebSocket(`ws://${window.location.host}/ws/admin`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PLATFORM_METRICS_UPDATE') {
        setStats(data.payload);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col space-y-4">
        <div className="text-xl font-bold tracking-tight text-gray-900 mb-8">
          Platform Admin
        </div>
        <a href="#overview" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg font-medium">
          <Activity className="w-5 h-5" />
          <span>Overview</span>
        </a>
        <a href="#tenants" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors">
          <Database className="w-5 h-5" />
          <span>Tenants / Orgs</span>
        </a>
        <a href="#users" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors">
          <Users className="w-5 h-5" />
          <span>Global Users</span>
        </a>
        <a href="#system" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors">
          <Server className="w-5 h-5" />
          <span>System Health</span>
        </a>
        <div className="flex-grow" />
        <a href="#settings" className="flex items-center space-x-3 text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg font-medium transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time platform overview and metrics.</p>
        </header>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center shadow-sm">
             <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                <Database className="w-6 h-6" />
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Active Tenants</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeTenants}</h3>
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center shadow-sm">
             <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 mr-4">
                <Users className="w-6 h-6" />
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Total Global Users</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center shadow-sm">
             <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 mr-4">
                <Activity className="w-6 h-6" />
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">System Status</p>
                <h3 className="text-xl font-bold text-gray-900 capitalize">{stats.sysHealth}</h3>
             </div>
          </div>
        </div>

        {/* Charts & Tables Area */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h2>
          <div className="h-72 w-full">
            <OverviewChart />
          </div>
        </div>
      </main>
    </div>
  );
}
