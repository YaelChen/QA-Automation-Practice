import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
    constructor(private page: Page) {}
   
  async clickFinish() {
    await this.page.locator('#finish').click();
  }
}
