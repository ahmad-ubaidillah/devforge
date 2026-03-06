import { UIComponent } from './registry';

export const INITIAL_COMPONENTS: UIComponent[] = [
  // Buttons (Solid)
  {
    name: 'Button',
    description: 'A beautiful, accessible, and highly customizable button component.',
    framework: 'solid',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'src/components/ui/Button.tsx',
        content: `import { JSX, splitProps } from 'solid-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'children']);
  
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    primary: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-black dark:text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20"
  };

  const sizes = {
    sm: "h-9 px-3",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8 rounded-md"
  };

  return (
    <button
      class={cn(
        baseClasses,
        variants[local.variant || 'primary'],
        sizes[local.size || 'md'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </button>
  );
}
`
      }
    ]
  },
  // Input (Solid)
  {
    name: 'Input',
    description: 'A sleek, default-styled input field.',
    framework: 'solid',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'src/components/ui/Input.tsx',
        content: `import { JSX, splitProps } from 'solid-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <input
      class={cn(
        "flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-300",
        local.class
      )}
      {...others}
    />
  );
}
`
      }
    ]
  },
  // Card (Solid)
  {
    name: 'Card',
    description: 'A container component for grouping content with a glassmorphism style.',
    framework: 'solid',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'src/components/ui/Card.tsx',
        content: `import { JSX, splitProps } from 'solid-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  return (
    <div
      class={cn("rounded-xl border border-zinc-200 bg-white/50 text-zinc-950 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50", local.class)}
      {...others}
    >
      {local.children}
    </div>
  );
}

export function CardHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  return <div class={cn("flex flex-col space-y-1.5 p-6", local.class)} {...others}>{local.children}</div>;
}

export function CardTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  return <h3 class={cn("font-semibold leading-none tracking-tight", local.class)} {...others}>{local.children}</h3>;
}

export function CardContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  return <div class={cn("p-6 pt-0", local.class)} {...others}>{local.children}</div>;
}
`
      }
    ]
  },
  // Modal (Solid)
  {
    name: 'Modal',
    description: 'A dialog component covering the main content.',
    framework: 'solid',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'src/components/ui/Modal.tsx',
        content: `import { JSX, Show, splitProps } from 'solid-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal(props: ModalProps) {
  const [local, others] = splitProps(props, ['class', 'isOpen', 'onClose', 'children']);

  return (
    <Show when={local.isOpen}>
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={local.onClose}
      >
        <div 
          class={cn("relative z-50 w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950", local.class)}
          onClick={(e) => e.stopPropagation()}
          {...others}
        >
          {local.children}
        </div>
      </div>
    </Show>
  );
}
`
      }
    ]
  },
  // Button (React)
  {
    name: 'Button',
    description: 'A beautiful, accessible, and highly customizable button component.',
    framework: 'react',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'src/components/ui/Button.tsx',
        content: `import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variants = {
      primary: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
      ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-black dark:text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20"
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 py-2 px-4",
      lg: "h-11 px-8 rounded-md"
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
`
      }
    ]
  }
];
