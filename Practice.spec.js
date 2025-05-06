import { test, expect } from '@playwright/test';

test('Login to Saucedemo.com and commit purchase', async({ page }) => {

    await test.step('Navigate to login page', async() => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Login with valid credentials', async() => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    await test.step('Add item to cart', async() => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    await test.step('Go to cart and start checkout', async() => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('#checkout').click();
    });

    await test.step('Fill in checkout form', async() => {
        await page.locator('#first-name').fill('Nils');
        await page.locator('#last-name').fill('Holgersson');
        await page.locator('#postal-code').fill('96099');
        await page.locator('#continue').click();
    });

    await test.step('Finish purchase', async() => {
        await page.locator('#finish').click();
    });

    await test.step('Verify confirmation message', async() => {
        const confirmationMessage = page.locator('.complete-header');
        await expect(confirmationMessage).toHaveText('Thank you for your order!');
    });

    await test.step('Verify cart is empty', async() => {
        await expect(page.locator('.shopping-cart-badge')).toBeHidden();
    });
});
