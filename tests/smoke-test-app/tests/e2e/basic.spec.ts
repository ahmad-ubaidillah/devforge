import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/DevForge/);
});

test('api is running', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe('running');
});
