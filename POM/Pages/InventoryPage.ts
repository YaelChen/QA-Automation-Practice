import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) {}
  
    async pickProduct(prod: string) {
        const locator = `[data-test="add-to-cart-${prod}"]`;
        await this.page.locator(locator).click();
    }
  }
  