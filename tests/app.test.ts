import { test, expect } from '@playwright/test';

test.describe("Root", () => {
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

test.describe("Index", () => {
  test("goes to men's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const menCatalog = await page.getByRole("link", { name: "Men", exact: true }).all();
    await menCatalog[1].click()
    await page.waitForURL(baseURL + "/catalog/men");
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const womenCatalog = await page.getByRole("link", { name: "Women", exact: true }).all();
    await womenCatalog[1].click()
    await page.waitForURL(baseURL + "/catalog/women");
  })
})

test.describe("Catalog", () => {
  test("goes to a catalogItem when See More btn is clicked", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/catalog/men");
    const firstForm = page.locator("#item1");
    await expect(firstForm).toBeAttached();
    const seeMoreBtn = firstForm.locator("button");
    await seeMoreBtn.click();
    await page.waitForURL(baseURL + "/catalog/men/1");
  })
})

test.describe("CatalogItem", () => {
  test("user can choose a size, if approptiate", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/catalog/men/1");
    const m = page.getByLabel("M", { exact: true });
    const s = page.getByLabel("S", { exact: true });
    await expect(s).toBeChecked();
    await m.click();
    await expect(m).toBeEnabled();
    const addToCartBtn = page.getByRole("button", {name: "Add to Cart"});
    await addToCartBtn.click();
    await expect(addToCartBtn).toBeDisabled();
  })

  test("item with no size", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/catalog/men/5");
    const oneSize = page.getByLabel("One size");
    await expect(oneSize).toBeChecked();
    const addToCartBtn = page.getByRole("button", {name: "Add to Cart"});
    await addToCartBtn.click();
    await expect(addToCartBtn).toBeDisabled();
  })
})