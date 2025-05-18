import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}
   
  async verifyThanksMessage() {
    const confirmationMessage = this.page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!');
  }

  async verifyCartIsEmpty() {
    await expect(this.page.locator('.shopping-cart-badge')).toBeHidden();
  }
}
