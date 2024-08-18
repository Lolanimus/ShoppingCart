import { test, expect } from '@playwright/test';

test.describe("Rooot", () => {
  test('has title', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Shopping Cart/);
  });

  test("goes to men's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const menCatalog = await page.getByRole("link", { name: "Men", exact: true }).all();
    await menCatalog[0].click()
    await page.waitForURL(baseURL + "/catalog/men");
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const womenCatalog = await page.getByRole("link", { name: "Women", exact: true }).all();
    await womenCatalog[0].click()
    await page.waitForURL(baseURL + "/catalog/women");
  })

  test("goes to cart", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const cart = page.getByRole("link", { name: "Cart Image" });
    await cart.click()
    await page.waitForURL(baseURL + "/cart");
  })
  
  test("goes to main page", async ({ page, baseURL }) => {
    await page.goto(baseURL + '/cart');
    expect(await page.getByRole("heading", {level: 1}).textContent()).toBe("Cart");
    const logo = page.getByRole("img", { name: "Lolan Logo" }).locator("..");
    await logo.click();
    await page.waitForURL(baseURL!);
  })
})

