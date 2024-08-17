import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://192.168.6.37:3000');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Shopping Cart/);
  });
  