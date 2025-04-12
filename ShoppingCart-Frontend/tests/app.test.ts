import { test, expect, Page } from '@playwright/test';
import { contents } from '../frontend/__mocks__/data';

//test.describe.configure({ mode: 'serial' });

const addProductsToCart = async (page: Page, baseURL: string) => {
  await page.goto(baseURL + "/product/all/male/" + contents[1].productId);
  await page.getByLabel("M", { exact: true }).click();
  page.waitForResponse(response => 
    response.url().includes('/cart/add') && response.status() === 200
  );
  await page.getByRole("button", {name: "Add to Cart"}).click();
  await expect(page.locator(".success_popup")).toBeVisible(); 
  await page.goto(baseURL + "/product/all/female/" + contents[2].productId);
  await page.getByLabel("L", { exact: true }).click();
  page.waitForResponse(response => 
    response.url().includes('/cart/add') && response.status() === 200
  );
  await page.getByRole("button", {name: "Add to Cart"}).click(); 
  await expect(page.locator(".success_popup")).toBeVisible();
  await page.goto(baseURL + "/cart");
}

const clearCart = async (page: Page, baseURL: string) => {
  await page.goto(baseURL + "/cart");
  const button = page.getByRole('button', { name: 'Buy' });
  if(!(await button.isDisabled()))
  {
    await page.getByRole('button', { name: 'Buy' }).click();
    await expect(page.getByText('There are no items in your cart yet...')).toBeVisible();
  } 
}

test.describe("Root", () => {
  test('has title', async ({ page, baseURL }) => {
    await page.goto(baseURL!);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Shopping Cart/);
  });

  test("goes to men's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    await page.getByRole('banner').getByRole('link', { name: 'Men', exact: true }).click();
    await expect(page.getByRole('heading', { name: '• Men' })).toBeInViewport();
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    await page.getByRole('banner').getByRole('link', { name: 'Women' }).click();
    await expect(page.getByRole('heading', { name: '• Women' })).toBeInViewport();
  })

  test("goes to cart", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    await page.getByRole('link', { name: 'Cart Image' }).click();
    await expect(page.getByRole('heading', { name: 'Cart' })).toBeInViewport();
  })
  
  test("goes to main page", async ({ page, baseURL }) => {
    await page.goto(baseURL + '/cart');
    await page.getByRole('img', { name: 'Lolan Logo' }).click();
    await expect(page.getByRole('heading', { name: 'Lolan' })).toBeInViewport();
  })
})

test.describe("Index", () => {
  test("goes to men's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    await page.getByRole('main').getByRole('link', { name: 'Men', exact: true }).click();
    await expect(page.getByRole("heading", {level: 1, name: "• Men"})).toBeInViewport();
  })

  test("goes to women's catalog", async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    await page.getByRole('main').getByRole('link', { name: 'Women', exact: true }).click();
    await expect(page.getByRole("heading", {level: 1, name: "• Women"})).toBeInViewport();
  })
})

test.describe("Catalog", () => {
  test("goes to a catalogItem when See More btn is clicked", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/product/all/male");
    await page.locator('#item759695d5-7aa2-459e-b72e-59ea740cecdd > [id="_itemInfo_ybmwe_1"] > form > button').click();
    await expect(page.getByText('L', { exact: true })).toBeVisible();
    await expect(page.getByText('Slim-fitting style, contrast')).toBeVisible();
  })
})

test.describe("CatalogItem", () => {
  test("user can choose a size, if approptiate", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/product/all/male/" + contents[1].productId);
    expect(page.getByRole("heading", {level: 1, name: "Mens Casual Premium Slim Fit T-Shirts"}));
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
    await page.goto(baseURL + "/product/all/male/" + contents[0].productId);
    const oneSize = page.getByLabel("One size");
    expect(oneSize);
    await expect(oneSize).toBeChecked();
    const addToCartBtn = page.getByRole("button", {name: "Add to Cart"});
    expect(addToCartBtn);
    await addToCartBtn.click();
    await expect(addToCartBtn).toBeDisabled();
  })
})

test.describe("Cart", () => {

  test.beforeEach(async ({page, baseURL}) => {
    await addProductsToCart(page, baseURL!);
  })

  test.afterEach(async ({page, baseURL}) => {
    await clearCart(page, baseURL!);
  })

  test("successfully added to the cart", async ({ page }) => {
    await expect(page.getByTestId('itemsList').getByRole('list').filter({ hasText: 'Mens Casual Premium Slim Fit' })).toBeInViewport();
    await expect(page.getByTestId('itemsList').getByRole('list').filter({ hasText: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' })).toBeInViewport();
  });

  test("increase/decrease quantity", async ({ page }) => {
    await expect(page.getByRole('listitem').filter({ hasText: /^Mens Casual Premium Slim Fit T-Shirts$/ })).toBeVisible(); 
    await expect(page.getByRole('listitem').filter({ hasText: /^Rain Jacket Women Windbreaker Striped Climbing Raincoats$/ })).toBeVisible(); 
    await expect(page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).getByTestId('quantity')).toContainText('1');
    await expect(page.getByRole('complementary').filter({ hasText: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' }).getByTestId('quantity')).toContainText('1');
    await page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).locator('button[name="increase"]').click();
    await page.getByRole('complementary').filter({ hasText: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' }).locator('button[name="increase"]').click();
    await expect(page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).getByTestId('quantity')).toContainText('2');
    await expect(page.getByRole('complementary').filter({ hasText: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' }).getByTestId('quantity')).toContainText('2');
    await page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).locator('button[name="decrease"]').click();
    await expect(page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).getByTestId('quantity')).toContainText('1');
  })

  test("delete product", async ({ page }) => {
    await expect(page.getByRole('listitem').filter({ hasText: /^Mens Casual Premium Slim Fit T-Shirts$/ })).toBeVisible(); 
    await expect(page.getByRole('listitem').filter({ hasText: /^Rain Jacket Women Windbreaker Striped Climbing Raincoats$/ })).toBeVisible(); 
    await page.getByRole('complementary').filter({ hasText: 'Mens Casual Premium Slim Fit' }).locator('button[name="delete"]').click();
    await expect(page.getByTestId('title')).toHaveCount(1);
  })

  test("buy products", async ({ page }) => {
    await expect(page.getByRole('listitem').filter({ hasText: /^Mens Casual Premium Slim Fit T-Shirts$/ })).toBeVisible(); 
    await expect(page.getByRole('listitem').filter({ hasText: /^Rain Jacket Women Windbreaker Striped Climbing Raincoats$/ })).toBeVisible(); 
    await page.getByRole('button', { name: 'Buy' }).click();
    await expect(page.getByText('There are no items in your')).toBeVisible();
  })
})