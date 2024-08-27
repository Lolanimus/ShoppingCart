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
    await expect(page.getByRole("heading", {level: 1, name: "• Men"})).toBeInViewport();
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const womenCatalog = await page.getByRole("link", { name: "Women", exact: true }).all();
    await womenCatalog[0].click()
    await expect(page.getByRole("heading", {level: 1, name: "• Women"})).toBeInViewport();
  })

  test("goes to cart", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const cart = page.getByRole("link", { name: "Cart Image" });
    await cart.click()
    await expect(page.getByRole("heading", {level: 1, name: "Cart"})).toBeInViewport();
  })
  
  test("goes to main page", async ({ page, baseURL }) => {
    await page.goto(baseURL + '/cart');
    expect(await page.getByRole("heading", {level: 1}).textContent()).toBe("Cart");
    const logo = page.getByRole("img", { name: "Lolan Logo" });
    await logo.click();
    await expect(page.getByRole("heading", {level: 1, name: "Lolan"})).toBeInViewport();
  })
})

test.describe("Index", () => {
  test("goes to men's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const menCatalog = await page.getByRole("link", { name: "Men", exact: true }).all();
    await menCatalog[1].click()
    await expect(page.getByRole("heading", {level: 1, name: "• Men"})).toBeInViewport();
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    const womenCatalog = await page.getByRole("link", { name: "Women", exact: true }).all();
    await womenCatalog[1].click()
    await expect(page.getByRole("heading", {level: 1, name: "• Women"})).toBeInViewport();
  })
})

test.describe("Catalog", () => {
  test("goes to a catalogItem when See More btn is clicked", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/catalog/men");
    expect(page.getByRole("heading", {level: 1, name: "• Men"}));
    expect(page.locator("#item1"));
    const firstForm = page.locator("#item1");
    const seeMoreBtn = firstForm.locator("button");
    await seeMoreBtn.click();
    await expect(page.getByRole("heading", {name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"})).toBeInViewport();
  })
})

test.describe("CatalogItem", () => {
  test("user can choose a size, if approptiate", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/catalog/men/1");
    expect(page.getByRole("heading", {level: 1, name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}));
    const m = page.getByLabel("M", { exact: true });
    const s = page.getByLabel("S", { exact: true });
    expect(m);
    expect(s);
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
    expect(oneSize);
    await expect(oneSize).toBeChecked();
    const addToCartBtn = page.getByRole("button", {name: "Add to Cart"});
    expect(addToCartBtn);
    await addToCartBtn.click();
    await expect(addToCartBtn).toBeDisabled();
  })
})