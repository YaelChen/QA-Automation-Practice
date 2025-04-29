import { test, expect } from '@playwright/test';

test('Login to Saucedemo.com and commit purchase', async({ page }) => {

    await test.step('Navigate to login page', async() => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Login with valid credentials', async() => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    await test.step('Add item to cart', async() => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    await test.step('Go to cart and start checkout', async() => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
    });

    await test.step('Fill in checkout form', async() => {
        await page.locator('[data-test="firstName"]').fill('Nills');
        await page.locator('[data-test="lastName"]').fill('Holgerson');
        await page.locator('[data-test="postalCode"]').fill('96099');
        await page.locator('[data-test="continue"]').click();
    });

    await test.step('Finish purchase', async() => {
        await page.locator('[data-test="finish"]').click();
    });

    await test.step('Verify confirmation message', async() => {
        const confirmationMessage = page.locator('.complete-header');
        await expect(confirmationMessage).toHaveText('Thank you for your order!');
    });

    await test.step('Verify cart is empty', async() => {
        await expect(page.locator('.shopping-cart-badge')).toBeHidden();
    });
});