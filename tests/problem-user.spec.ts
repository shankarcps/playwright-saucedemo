// Images are broken — all product images show wrong src
// Add to cart button behaves incorrectly on some items
// Sorting doesn't work correctly

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Problem User Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');
  });

  test('images are broken', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await expect(productsPage.productItems.first().locator('img')).toHaveAttribute(
      'src',
      '/static/media/sl-404.168b1cce10384b857a6f.jpg'
    );
  });

  test('add to cart button behaves incorrectly on some items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstItemToCart();
    await expect(productsPage.productItems.first().locator('button')).toHaveText('Remove');
  });

  test('remove from cart does not remove items from cart',async({page}) =>{
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addFirstItemToCart();
    // await productsPage.goToCart();
    // await expect(cartPage.cartItems).toHaveCount(1);
    await productsPage.removeFirstItemFromCart();
    await productsPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
  });
});