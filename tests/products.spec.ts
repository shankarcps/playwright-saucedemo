import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Product and Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('products page has 6 items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await expect(productsPage.productItems).toHaveCount(6);
  });

  test('add item to cart updates badge', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstItemToCart();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('added item appears in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();
    const hasItem = await cartPage.isItemInCart();
    expect(hasItem).toBe(true);
  });

  test('adding and removing items from cart works properly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addFirstItemToCart();
    await productsPage.removeFirstItemFromCart();
    await productsPage.goToCart();
    const hasItem = await cartPage.isItemInCart();
    expect(hasItem).toBe(false);
  });

});