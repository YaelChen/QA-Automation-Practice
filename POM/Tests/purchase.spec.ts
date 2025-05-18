import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage'
import { CheckoutOverviewPage } from '../Pages/CheckoutOverviewPage'
import { CheckoutCompletePage } from '../Pages/CheckoutCompletePage'

test('Login to Saucedemo.com and commit purchase', async({ page }) => {

    await test.step('Navigate to login page', async() => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Login with valid credentials', async() => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Add items and go to cart', async() => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.pickProduct('sauce-labs-backpack');
        await page.locator('[data-test="shopping-cart-link"]').click();
    });

    await test.step('Go to cart and start checkout', async() => {
        const cartPage = new CartPage(page);
        await cartPage.clickCheckout()
    });

    await test.step('Fill in checkout form', async() => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.checkout('Nils', 'Holgersson', '96099')
    });

    await test.step('Finish purchase', async() => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        checkoutOverviewPage.clickFinish
    });

    await test.step('Verify confirmation message', async() => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        checkoutCompletePage.verifyThanksMessage
        checkoutCompletePage.verifyCartIsEmpty
    });
});
