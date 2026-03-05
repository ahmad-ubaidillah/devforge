import { createSignal, For, Show, onMount, createEffect } from 'solid-js';
import { createQuery, createMutation, useQueryClient } from '@tanstack/solid-query';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

export default function App() {
  const [activeTab, setActiveTab] = createSignal('projects');
  const [marketFilter, setMarketFilter] = createSignal('all');
  const queryClient = useQueryClient();

  const templatesQuery = createQuery(() => ({
    queryKey: ['templates'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/templates');
      const data = await res.json();
      return data.templates as string[];
    }
  }));

  const pluginsQuery = createQuery(() => ({
    queryKey: ['plugins', marketFilter()],
    queryFn: async () => {
      const url = marketFilter() === 'all' 
        ? 'http://localhost:4000/api/plugins' 
        : `http://localhost:4000/api/plugins?template=${marketFilter()}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.plugins as any[];
    }
  }));

  const projectsQuery = createQuery(() => ({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/projects');
      const data = await res.json();
      return data.projects as string[];
    }
  }));

  const projectMutation = createMutation(() => ({
    mutationFn: async (vars: { name: string, template: string }) => {
      const res = await fetch('http://localhost:4000/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName: vars.name, templateName: vars.template, plugins: [] })
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alert('Project created successfully!');
    },
    onError: (e: any) => {
      alert('Error: ' + e.message);
    }
  }));

  const createProject = (template: string) => {
    const name = prompt('Enter project name:');
    if (!name) return;
    projectMutation.mutate({ name, template });
  };

  const initGraph = async () => {
    const container = document.getElementById('visualizer');
    if (!container) return;

    const res = await fetch('http://localhost:4000/api/graph');
    const data = await res.json();

    const nodes = new DataSet(data.nodes);
    const edges = new DataSet(data.edges);

    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: { size: 12, color: '#ffffff', face: 'Inter' },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 2,
        color: { color: 'rgba(255,255,255,0.1)', highlight: '#06b6d4' },
        arrows: { to: { enabled: true, scaleFactor: 0.5 } }
      },
      physics: {
        stabilization: true,
        barnesHut: { gravitationalConstant: -2000, springLength: 200 }
      }
    };

    new Network(container, { nodes: nodes as any, edges: edges as any }, options);
  };

  createEffect(() => {
    if (activeTab() === 'graph') {
      // Short delay to ensure target div is in the DOM
      setTimeout(initGraph, 10);
    }
  });

  onMount(() => {
    // Other onMount logic if any
  });

  return (
    <div class="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <nav class="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl p-8 z-50">
        <div class="mb-12">
          <h1 class="text-2xl font-black tracking-tighter uppercase italic text-cyan-500">DevForge</h1>
          <p class="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1 font-bold">Local Hub v1.0</p>
        </div>

        <div class="space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            class={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab() === 'projects' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Workspace
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            class={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab() === 'templates' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Templates
          </button>
          <button 
            onClick={() => setActiveTab('plugins')}
            class={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab() === 'plugins' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('graph')}
            class={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab() === 'graph' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Architecture
          </button>
        </div>

        <div class="absolute bottom-8 left-8 right-8">
          <div class="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <p class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Status</p>
            <p class="text-xs font-medium text-white/80">Local Engine Connected</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main class="ml-64 p-12">
        <Show when={activeTab() === 'projects'}>
          <header class="mb-12">
            <h2 class="text-4xl font-bold tracking-tight">Active Projects</h2>
            <p class="text-white/40 mt-2">Manage your current DevForge builds.</p>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={projectsQuery.data}>
              {(project) => (
                <div class="group relative p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                  <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse inline-block" />
                  </div>
                  <h3 class="text-xl font-bold tracking-tight">{project}</h3>
                  <div class="mt-8 flex gap-3">
                    <button class="px-4 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors">Launch</button>
                    <button class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Config</button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show when={activeTab() === 'templates'}>
          <header class="mb-12">
            <h2 class="text-4xl font-bold tracking-tight">Boilerplate Ecosystem</h2>
            <p class="text-white/40 mt-2">One-click scaffold for premium web apps.</p>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={templatesQuery.data}>
              {(template) => (
                <div 
                  onClick={() => createProject(template)}
                  class="group cursor-pointer p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-cyan-500/40 hover:to-blue-500/40 transition-all duration-500"
                >
                  <div class="bg-[#0f0f0f] rounded-[15px] p-6 h-full flex flex-col justify-between">
                    <div>
                      <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-xs font-bold text-white group-hover:bg-cyan-500 transition-colors uppercase italic">
                        {template.slice(0, 2)}
                      </div>
                      <h3 class="text-xl font-bold tracking-tight uppercase italic">{template}</h3>
                      <p class="text-[11px] text-white/40 mt-2 line-clamp-2 uppercase">Official DevForge {template} template stack.</p>
                    </div>
                    <div class="mt-8">
                       <span class="text-[10px] font-black tracking-widest uppercase text-cyan-500 group-hover:translate-x-2 transition-transform inline-block">Build Project →</span>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show when={activeTab() === 'plugins'}>
          <header class="mb-12 flex justify-between items-end">
            <div>
              <h2 class="text-4xl font-bold tracking-tight">Plugin Marketplace</h2>
              <p class="text-white/40 mt-2">Expand your core with modular feature-blocks.</p>
            </div>
            <div class="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <For each={['all', 'saas', 'crm', 'booking']}>
                {(filter) => (
                  <button 
                    onClick={() => setMarketFilter(filter)}
                    class={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${marketFilter() === filter ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}
                  >
                    {filter}
                  </button>
                )}
              </For>
            </div>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={pluginsQuery.data}>
              {(plugin) => (
                <div class="group relative p-8 rounded-3xl bg-[#0f0f0f] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                  <div class="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />
                  
                  <div>
                    <div class="flex justify-between items-start mb-6">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-black text-xs italic group-hover:scale-110 transition-transform">
                        {plugin.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div class="flex gap-2">
                        <For each={plugin.compatibleTemplates}>
                          {(tpl) => (
                             <span class="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[8px] font-bold uppercase tracking-widest border border-cyan-500/20">
                               {tpl}
                             </span>
                          )}
                        </For>
                      </div>
                    </div>

                    <h3 class="text-2xl font-bold tracking-tight italic uppercase">{plugin.name}</h3>
                    <p class="text-xs text-white/40 mt-3 leading-relaxed font-medium">{plugin.description}</p>
                    
                    <div class="mt-6 flex flex-wrap gap-1.5">
                      <For each={Object.entries(plugin.packageDependencies || {})}>
                        {([name, version]) => (
                          <span class="px-2 py-1 rounded-lg bg-black/40 text-[9px] font-bold text-white/20 uppercase tracking-tighter border border-white/5">
                            {name}
                          </span>
                        )}
                      </For>
                    </div>
                  </div>

                  <div class="mt-10">
                    <button class="group/btn w-full py-4 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] relative overflow-hidden transition-all hover:pr-8 active:scale-95">
                      <span class="relative z-10">Enable Feature</span>
                      <span class="absolute right-4 opacity-0 group-hover/btn:opacity-100 transition-all">→</span>
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
        <Show when={activeTab() === 'graph'}>
          <header class="mb-12">
            <h2 class="text-4xl font-bold tracking-tight">Dependency Graph</h2>
            <p class="text-white/40 mt-2">Visualizing the architectural integrity of the ecosystem.</p>
          </header>

          <div class="p-8 rounded-3xl bg-[#111] border border-white/5 h-[600px] relative overflow-hidden">
            <div id="visualizer" class="h-full w-full" />
            <div class="absolute bottom-6 left-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/5">
              <p class="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Legend</p>
              <div class="space-y-1">
                <div class="flex items-center gap-2 text-[9px] uppercase font-bold"><span class="w-2 h-2 rounded-full bg-cyan-500"/> Core</div>
                <div class="flex items-center gap-2 text-[9px] uppercase font-bold"><span class="w-2 h-2 rounded-full bg-blue-500"/> Templates</div>
                <div class="flex items-center gap-2 text-[9px] uppercase font-bold"><span class="w-2 h-2 rounded-full bg-green-500"/> Plugins</div>
              </div>
            </div>
          </div>
        </Show>
      </main>

      <Show when={projectMutation.isPending}>
        <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100]">
          <div class="text-center">
            <div class="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6 mx-auto" />
            <h3 class="text-xl font-black tracking-tighter uppercase italic">Scaffolding Project</h3>
            <p class="text-[10px] text-white/40 uppercase tracking-widest mt-2">Applying DevForge architecture...</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
