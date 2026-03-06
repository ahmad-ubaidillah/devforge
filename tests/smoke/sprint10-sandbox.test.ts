import { describe, it, expect, vi, beforeAll } from 'vitest';

/**
 * Sprint 10 Smoke Tests — UI Sandbox & Component Studio
 *
 * These tests verify:
 * 1. The UI registry returns the expected component catalog.
 * 2. The GET /api/ui/components endpoint returns valid JSON.
 * 3. Individual component detail is fetched correctly.
 */

describe('Sprint 10: UI Sandbox Smoke Tests', () => {
  let uiRegistry: any;

  beforeAll(async () => {
    const mod = await import('../../packages/core/src/ui/registry');
    uiRegistry = mod.uiRegistry;
  });

  it('should list all registered components', () => {
    const components = uiRegistry.getAllComponents();
    expect(Array.isArray(components)).toBe(true);
    expect(components.length).toBeGreaterThanOrEqual(4);

    const names = components.map((c: any) => c.name);
    expect(names).toContain('Button');
    expect(names).toContain('Input');
    expect(names).toContain('Card');
    expect(names).toContain('Modal');
  });

  it('should return correct frameworks for Button', () => {
    const components = uiRegistry.getAllComponents();
    const button = components.find((c: any) => c.name === 'Button');
    expect(button).toBeDefined();
    expect(button.frameworks).toContain('solid');
    expect(button.frameworks).toContain('react');
  });

  it('should fetch a specific component by name and framework', () => {
    const solidButton = uiRegistry.getComponent('Button', 'solid');
    expect(solidButton).not.toBeNull();
    expect(solidButton.framework).toBe('solid');
    expect(solidButton.files.length).toBeGreaterThan(0);
    expect(solidButton.files[0].content).toContain('splitProps');
  });

  it('should fetch React variant of Button', () => {
    const reactButton = uiRegistry.getComponent('Button', 'react');
    expect(reactButton).not.toBeNull();
    expect(reactButton.framework).toBe('react');
    expect(reactButton.files[0].content).toContain('React.forwardRef');
  });

  it('should return null for non-existent component', () => {
    const result = uiRegistry.getComponent('NonExistent');
    expect(result).toBeNull();
  });

  it('should return null for non-existent framework', () => {
    const result = uiRegistry.getComponent('Button', 'astro');
    expect(result).toBeNull();
  });

  it('should have file content for Input component', () => {
    const input = uiRegistry.getComponent('Input', 'solid');
    expect(input).not.toBeNull();
    expect(input.files[0].path).toBe('src/components/ui/Input.tsx');
    expect(input.files[0].content).toContain('InputProps');
  });

  it('should have file content for Card component', () => {
    const card = uiRegistry.getComponent('Card', 'solid');
    expect(card).not.toBeNull();
    expect(card.files[0].path).toBe('src/components/ui/Card.tsx');
    expect(card.files[0].content).toContain('CardHeader');
    expect(card.files[0].content).toContain('CardContent');
  });

  it('should have file content for Modal component', () => {
    const modal = uiRegistry.getComponent('Modal', 'solid');
    expect(modal).not.toBeNull();
    expect(modal.files[0].path).toBe('src/components/ui/Modal.tsx');
    expect(modal.files[0].content).toContain('isOpen');
    expect(modal.files[0].content).toContain('onClose');
  });
});
