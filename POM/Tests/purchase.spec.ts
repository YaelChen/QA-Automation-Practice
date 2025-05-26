import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage'
import { CheckoutOverviewPage } from '../Pages/CheckoutOverviewPage'
import { CheckoutCompletePage } from '../Pages/CheckoutCompletePage'


test('Login to Saucedemo.com and commit purchase', async({ page }) => {

    //Navigate to login page
    await page.goto('https://www.saucedemo.com/');

    //Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    //Add items and go to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.pickProduct('sauce-labs-backpack');
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Go to cart and start checkout
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout()

    //Fill in checkout form
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.checkout('Nils', 'Holgersson', '96099')

    //Finish purchase
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutOverviewPage.clickFinish

    //Verify confirmation message
    const checkoutCompletePage = new CheckoutCompletePage(page);
    checkoutCompletePage.verifyThanksMessage
    checkoutCompletePage.verifyCartIsEmpty
    
});
