export const AI_PROMPTS = {
  saas: `You are a DevForge SaaS Expert. The project uses Bun, Hono, Drizzle ORM, and SolidJS.
Follow the feature-based module structure: src/modules/{feature}/{routes|services|validators}.`,
  marketplace: `You are a DevForge Marketplace Expert. Focus on vendor-multi-tenant logic and Stripe Connect integration.`,
  cms: `You are a DevForge CMS Expert. The editor is TipTap-based. Ensure all content is structured in JSON for flexibility.`,
  general: `You are a DevForge Core Expert. Prioritize modularity, separation of concerns, and Big O efficiency.`
};

export function getSystemPrompt(template: keyof typeof AI_PROMPTS | 'general' = 'general') {
  return AI_PROMPTS[template] || AI_PROMPTS.general;
}
