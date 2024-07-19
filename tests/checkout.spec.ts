// Importing necessary modules for Playwright test
import { expect } from '@playwright/test';
// Importing page objects
import LoginPage from '../src/pages/loginPage';
import InventoryPage from '../src/pages/inventoryPage';
// Importing custom test fixture
import {test} from './testFixtures'

/**
 * Test checkout userflow in SauceDemo
 */
test.describe('[Product Checkout]', () => {

  /**
   * Before each test, login using valid credentials
   */
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await page.goto('/');
    // Fill valid credentials and login 
    await loginPage.loginToApplicationWithValidCredentials();
  });

  /**
   * Test case: Add random products to cart and complete the checkout flow by placing an order
   * @tags {regression, sanity}
   */
  test('Login with valid credentials and complete the checkout flow @regression @sanity', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act
    const totalItemsIntheCart = await (await inventoryPage
      .addRandomProductsToCart(3))
      .getCountOfTotalItemsAddedInCart();
      
      // Assert
    expect(totalItemsIntheCart).toBe('3');

    // Act
    const successMesaageAfterPlacingOrder = (await (await (await (await inventoryPage.goToCart())
          .proceedToCheckout())
          .completeCheckoutToPlaceOrder())
          .getSuccessMessage());

    // Assert
    expect(successMesaageAfterPlacingOrder).toBe('Thank you for your order!');

  });
});
