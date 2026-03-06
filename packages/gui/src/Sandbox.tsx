import { createSignal, For, Show, createEffect } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';

/** Metadata returned from the registry API */
interface ComponentMeta {
  name: string;
  frameworks: string[];
  description: string;
}

/** Full component detail returned from the registry API */
interface ComponentDetail {
  name: string;
  framework: string;
  description: string;
  dependencies: string[];
  files: { path: string; content: string }[];
}

export default function Sandbox() {
  const [selected, setSelected] = createSignal<string | null>(null);
  const [activeFramework, setActiveFramework] = createSignal('solid');
  const [previewVariant, setPreviewVariant] = createSignal('primary');
  const [previewSize, setPreviewSize] = createSignal('md');
  const [isDarkPreview, setIsDarkPreview] = createSignal(true);

  // Fetch list of all available components
  const componentsQuery = createQuery(() => ({
    queryKey: ['ui-components'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/ui/components');
      const data = await res.json();
      return data.components as ComponentMeta[];
    }
  }));

  // Fetch the selected component's full detail (source code)
  const detailQuery = createQuery(() => ({
    queryKey: ['ui-component-detail', selected(), activeFramework()],
    queryFn: async () => {
      if (!selected()) return null;
      const res = await fetch(
        `http://localhost:4000/api/ui/components/${selected()}?framework=${activeFramework()}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.component as ComponentDetail;
    },
    enabled: !!selected()
  }));

  // Auto-select the first component on load
  createEffect(() => {
    if (componentsQuery.data && componentsQuery.data.length > 0 && !selected()) {
      setSelected(componentsQuery.data[0].name);
    }
  });

  return (
    <div>
      <header class="mb-10">
        <h2 class="text-4xl font-bold tracking-tight">Component Studio</h2>
        <p class="text-white/40 mt-2">
          Preview, inspect, and install editorial-grade UI components.
        </p>
      </header>

      <div class="flex gap-8">
        {/* Sidebar: Component List */}
        <aside class="w-72 shrink-0 space-y-2">
          <p class="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-4">
            Registry
          </p>
          <Show when={componentsQuery.isLoading}>
            <div class="text-white/30 text-xs animate-pulse py-4">Loading components...</div>
          </Show>
          <For each={componentsQuery.data}>
            {(comp) => (
              <button
                id={`sandbox-component-${comp.name.toLowerCase()}`}
                onClick={() => setSelected(comp.name)}
                class={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  selected() === comp.name
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/5'
                    : 'bg-white/[0.03] border border-white/5 text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                <div class="flex items-center gap-3">
                  <div class={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase italic transition-colors ${
                    selected() === comp.name ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/30 group-hover:bg-white/10'
                  }`}>
                    {comp.name.slice(0, 2)}
                  </div>
                  <div>
                    <span class="block font-bold tracking-tight">{comp.name}</span>
                    <span class="block text-[10px] text-white/30 mt-0.5 truncate max-w-[160px]">
                      {comp.frameworks.join(' · ')}
                    </span>
                  </div>
                </div>
              </button>
            )}
          </For>
        </aside>

        {/* Main Panel */}
        <div class="flex-1 min-w-0 space-y-6">
          <Show when={detailQuery.data} fallback={
            <div class="flex items-center justify-center h-96 rounded-3xl bg-[#111] border border-white/5">
              <p class="text-white/20 text-sm">Select a component to preview</p>
            </div>
          }>
            {(detail) => (
              <>
                {/* Component Header */}
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-2xl font-bold tracking-tight italic uppercase">{detail().name}</h3>
                    <p class="text-xs text-white/40 mt-1">{detail().description}</p>
                  </div>
                  <div class="flex gap-2">
                    <For each={componentsQuery.data?.find(c => c.name === selected())?.frameworks || []}>
                      {(fw) => (
                        <button
                          onClick={() => setActiveFramework(fw)}
                          class={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            activeFramework() === fw
                              ? 'bg-cyan-500 text-black'
                              : 'bg-white/5 text-white/40 hover:text-white border border-white/10'
                          }`}
                        >
                          {fw}
                        </button>
                      )}
                    </For>
                  </div>
                </div>

                {/* Live Preview */}
                <div class={`rounded-3xl border border-white/5 overflow-hidden transition-colors duration-500 ${isDarkPreview() ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                  {/* Toolbar */}
                  <div class="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/30">
                    <div class="flex items-center gap-1.5">
                      <span class="w-3 h-3 rounded-full bg-red-500/60" />
                      <span class="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <span class="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <div class="flex items-center gap-3">
                      {/* Variant selector */}
                      <For each={['primary', 'secondary', 'ghost', 'glass']}>
                        {(v) => (
                          <button
                            onClick={() => setPreviewVariant(v)}
                            class={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${
                              previewVariant() === v
                                ? 'bg-white/15 text-white'
                                : 'text-white/25 hover:text-white/50'
                            }`}
                          >
                            {v}
                          </button>
                        )}
                      </For>
                      <div class="w-px h-4 bg-white/10" />
                      {/* Size selector */}
                      <For each={['sm', 'md', 'lg']}>
                        {(s) => (
                          <button
                            onClick={() => setPreviewSize(s)}
                            class={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${
                              previewSize() === s
                                ? 'bg-white/15 text-white'
                                : 'text-white/25 hover:text-white/50'
                            }`}
                          >
                            {s}
                          </button>
                        )}
                      </For>
                      <div class="w-px h-4 bg-white/10" />
                      {/* Theme toggle */}
                      <button
                        onClick={() => setIsDarkPreview(!isDarkPreview())}
                        class="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-all"
                      >
                        {isDarkPreview() ? '☀ Light' : '🌙 Dark'}
                      </button>
                    </div>
                  </div>

                  {/* Preview area */}
                  <div class="flex items-center justify-center p-16 min-h-[280px]">
                    <ComponentPreview
                      name={detail().name}
                      variant={previewVariant()}
                      size={previewSize()}
                      isDark={isDarkPreview()}
                    />
                  </div>
                </div>

                {/* Source Code */}
                <div class="rounded-3xl bg-[#0d0d0d] border border-white/5 overflow-hidden">
                  <div class="flex items-center justify-between px-6 py-3 border-b border-white/5">
                    <p class="text-[10px] font-black uppercase tracking-widest text-cyan-500">
                      Source · {detail().files[0]?.path}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(detail().files[0]?.content || '');
                      }}
                      class="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                    >
                      Copy Code
                    </button>
                  </div>
                  <pre class="p-6 overflow-x-auto text-[11px] leading-relaxed text-white/60 font-mono max-h-[400px]">
                    <code>{detail().files[0]?.content}</code>
                  </pre>
                </div>

                {/* Dependencies */}
                <Show when={detail().dependencies.length > 0}>
                  <div class="flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <span class="text-amber-400 text-sm">⚠</span>
                    <p class="text-[11px] text-amber-300/80 font-medium">
                      Requires: <code class="bg-black/30 px-2 py-0.5 rounded text-amber-200 font-mono">bun add {detail().dependencies.join(' ')}</code>
                    </p>
                  </div>
                </Show>
              </>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
}

/** 
 * Renders a live, interactive preview of the component 
 * using hard-coded SolidJS elements that match our registry's design tokens.
 */
function ComponentPreview(props: { name: string; variant: string; size: string; isDark: boolean }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";

  const sizeMap: Record<string, string> = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 py-2 px-4",
    lg: "h-12 px-8 text-base rounded-lg"
  };

  // Button Preview
  if (props.name === 'Button') {
    const v = props.variant;
    let cls = baseClasses + ' ' + (sizeMap[props.size] || sizeMap.md);

    if (v === 'primary') {
      cls += props.isDark ? ' bg-white text-black hover:bg-white/90' : ' bg-black text-white hover:bg-black/90 shadow-sm';
    } else if (v === 'secondary') {
      cls += props.isDark ? ' bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80' : ' bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80';
    } else if (v === 'ghost') {
      cls += props.isDark ? ' text-zinc-300 hover:bg-zinc-800' : ' text-zinc-700 hover:bg-zinc-100';
    } else if (v === 'glass') {
      cls += ' bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20';
      cls += props.isDark ? ' text-white' : ' text-black';
    }

    return (
      <div class="flex flex-col items-center gap-6">
        <div class="flex gap-4 items-center">
          <button class={cls}>DevForge Button</button>
          <button class={cls + ' opacity-50 cursor-not-allowed'} disabled>Disabled</button>
        </div>
        <p class={`text-[10px] uppercase tracking-widest font-bold ${props.isDark ? 'text-white/20' : 'text-black/30'}`}>
          {props.variant} · {props.size}
        </p>
      </div>
    );
  }

  // Input Preview
  if (props.name === 'Input') {
    const inputCls = `flex h-10 w-72 rounded-md border px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
      props.isDark
        ? 'border-zinc-700 bg-transparent text-zinc-50 focus:ring-zinc-300'
        : 'border-zinc-300 bg-transparent text-zinc-900 focus:ring-zinc-900'
    }`;
    return (
      <div class="flex flex-col items-center gap-4">
        <input class={inputCls} placeholder="Enter text..." />
        <input class={inputCls + ' opacity-50 cursor-not-allowed'} placeholder="Disabled..." disabled />
      </div>
    );
  }

  // Card Preview
  if (props.name === 'Card') {
    const cardCls = props.isDark
      ? 'rounded-xl border border-zinc-800 bg-zinc-950/50 text-zinc-50 shadow-sm backdrop-blur-xl'
      : 'rounded-xl border border-zinc-200 bg-white/50 text-zinc-950 shadow-sm backdrop-blur-xl';
    return (
      <div class={`${cardCls} w-80`}>
        <div class="flex flex-col space-y-1.5 p-6"><h3 class="font-semibold leading-none tracking-tight">Card Title</h3></div>
        <div class="p-6 pt-0"><p class={`text-sm ${props.isDark ? 'text-white/50' : 'text-black/50'}`}>Beautiful glassmorphism container for grouping content with depth and dimension.</p></div>
      </div>
    );
  }

  // Modal Preview
  if (props.name === 'Modal') {
    const panelCls = props.isDark
      ? 'rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg'
      : 'rounded-xl border border-zinc-200 bg-white p-6 shadow-lg';
    return (
      <div class="relative w-96 h-48 rounded-xl bg-black/20 flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div class={`relative z-10 ${panelCls} w-72`}>
          <h3 class="font-semibold text-sm mb-2">Modal Dialog</h3>
          <p class={`text-xs ${props.isDark ? 'text-white/40' : 'text-black/40'}`}>Backdrop-blur dialog with focus trapping and keyboard navigation.</p>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div class="text-white/20 text-sm italic">
      No preview available for "{props.name}"
    </div>
  );
}
