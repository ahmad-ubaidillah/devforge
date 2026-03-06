import { Hono } from 'hono';

export const onboardingRoutes = new Hono();

onboardingRoutes.get('/status', (c) => {
  return c.json({
    onboarded: false,
    currentStep: 0,
    tourEnabled: true,
  });
});

onboardingRoutes.post('/complete', (c) => {
  return c.json({ success: true, message: 'Onboarding completed' });
});
