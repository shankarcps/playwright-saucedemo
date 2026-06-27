import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addFirstItemToCart() {
    await this.productItems
      .first()
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFirstItemFromCart() {
    await this.productItems
      .first()
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }
  async addItemToCartByIndex(index: number) {
    await this.productItems
      .nth(index)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }
}