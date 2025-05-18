import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}
   
  async clickCheckout() {
    await this.page.locator('#checkout').click();
  }
}
