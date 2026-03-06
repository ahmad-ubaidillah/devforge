import { select, checkbox, input } from '@inquirer/prompts';

export const promptTemplate = async () => {
  return await select({
    message: 'What are you building?',
    choices: [
      { name: '1 Landing Page', value: 'landing' },
      { name: '2 SaaS', value: 'saas' },
      { name: '3 CMS', value: 'cms' },
      { name: '4 Marketplace', value: 'marketplace' },
      { name: '5 AI Wrapper', value: 'ai_wrapper' },
      { name: '6 Booking App', value: 'booking' },
      { name: '7 Finance Tool', value: 'finance' },
      { name: '8 CRM', value: 'crm' },
      { name: '9 Preact App', value: 'preact' },
    ],
  });
};

export const promptPlugins = async (availablePlugins: string[]) => {
  return await checkbox({
    message: 'Select plugins to include:',
    choices: availablePlugins.map((plugin) => ({ name: plugin, value: plugin })),
  });
};

export const promptAgentKey = async () => {
  return await input({
    message: 'Enter Agent Activation Key (Premium):',
    validate: (value) => value.length > 0 || 'Key is required for premium agent system.',
  });
};
