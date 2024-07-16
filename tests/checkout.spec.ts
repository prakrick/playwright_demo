// Importing necessary modules for Playwright test
const { test } = require('@playwright/test');

import { expect } from '@playwright/test';
// Importing page objects
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import HeaderPage from '../pages/HeaderPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import exp from 'constants';

/**
 * Test checkout userflow in SauceDemo
 */
 test.describe('[Product Checkout]', () => {

    /**
     * Before each test, navigate to the application homepage.
     */
    test.beforeEach(async({ page }) =>{
      // Navigate to the login page
      await page.goto('/')  
      const loginPage = new LoginPage(page)
        // Fill valid credentials and Login 
      await loginPage.loginToApplicationWithValidCredentials()
    })
  
    /**
     * Test case: Login with valid credentials and verify user is able to complete the checkout flow
     * @tags {regression, sanity}
     */
    test('Login with valid credentials and complete the checkout flow @regression @sanity', async ({ page }) => {
  
      // Assertions for successful login
    
      // Wait for page to load and add a product to Cart
      const productsPage = new ProductsPage(page)
      expect(await (productsPage.side_panel_icon_expand)).toBeVisible()
      const itemPrice = await productsPage.getItemPrice("Sauce Labs Backpack")
      console.log(itemPrice)
      await productsPage.addProductToCart("Sauce Labs Backpack")

    // Navigate to Cart
    const headerPage = new HeaderPage(page)
    await headerPage.header_icon_cart.click()

    // Checkout the product
    const cartPage = new CartPage(page)
    await cartPage.checkout_button.click()

    const checkoutPage = new CheckoutPage(page)
    expect(await (checkoutPage.title_checkout_your_information)).toBeVisible()
    await checkoutPage.fillCheckoutInformation();
    
    expect(await (checkoutPage.title_checkout_overview)).toBeVisible()
    expect(await (checkoutPage.inventory_item_name)).toContainText("Sauce Labs Backpack")
    expect(await (checkoutPage.inventory_item_price)).toContainText(itemPrice)
    expect(await (checkoutPage.cart_quantity)).toContainText("1")

    await checkoutPage.button_finish.click()
    expect(await (checkoutPage.success_message)).toContainText("Thank you for your order!")
    expect(await (checkoutPage.back_home)).toBeVisible()

    });

      
  
  });