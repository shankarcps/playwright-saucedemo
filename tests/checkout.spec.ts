import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('complete end to end purchase', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Add 2 products
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCartByIndex(0);
    await productsPage.addItemToCartByIndex(1);
    await expect(productsPage.cartBadge).toHaveText('2');

    // Step 3: Go to cart
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(2);

    // Step 4: Checkout
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetails('Shankar', 'R', '600001');

    // Step 5: Verify order summary is shown
    await expect(page).toHaveURL(/checkout-step-two/);

    // Step 6: Finish order
    await checkoutPage.finish();

    // Step 7: Confirm order
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete/);
  });

});