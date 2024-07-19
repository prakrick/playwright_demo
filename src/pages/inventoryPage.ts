import { Page, ElementHandle } from 'playwright';
import Wrappers from '../utils/wrappers';
import CheckoutPage from './checkoutPage';

/**
 * InventoryPage class represents the page displaying a list of products.
 * Provides methods to interact with the product list, such as adding products to the cart and navigating to the cart.
 * 
 * @class
 */
class InventoryPage {
  private page: Page;
  private cartLink = '.shopping_cart_link';
  private shoppingCartBadge = '.shopping_cart_badge';
  private addToCartButtonSelector = '//button[text()="Add to cart"]';

  /**
   * Initializes the InventoryPage instance with the given Playwright page object.
   * 
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the cart page.
   * 
   * @returns {Promise<CheckoutPage>} - A promise that resolves to an instance of CheckoutPage.
   */
  async goToCart(): Promise<CheckoutPage> {
    await Wrappers.click(this.page, this.cartLink);
    return new CheckoutPage(this.page);
  }

  /**
   * Adds a specified number of random products to the cart.
   * 
   * @param {number} numberOfProducts - The number of products to add to the cart.
   * @returns {Promise<InventoryPage>} - A promise that resolves to the current instance of InventoryPage for method chaining.
   */
  async addRandomProductsToCart(numberOfProducts: number): Promise<InventoryPage> {
    const addToCartButtons = await this.getAddToCartButtons();
    this.checkSufficientProducts(addToCartButtons, numberOfProducts);
    const shuffledButtons = this.shuffleButtons(addToCartButtons);
    await this.clickButtons(shuffledButtons, numberOfProducts);
    return this;
  }

  /**
   * Locates all the "Add to cart" buttons on the page.
   * 
   * @private
   * @returns {Promise<ElementHandle<Element>[]>} - A promise that resolves to an array of ElementHandle objects representing the "Add to cart" buttons.
   */
  private async getAddToCartButtons(): Promise<ElementHandle<Element>[]> {
    return await this.page.$$(this.addToCartButtonSelector);
  }

  /**
   * Checks if there are enough products to add to the cart.
   * 
   * @private
   * @param {ElementHandle<Element>[]} buttons - The array of "Add to cart" button elements.
   * @param {number} numberOfProducts - The number of products to add to the cart.
   * @throws {Error} - Throws an error if there are not enough products.
   */
  private checkSufficientProducts(buttons: ElementHandle<Element>[], numberOfProducts: number): void {
    if (buttons.length < numberOfProducts) {
      throw new Error(`Not enough products to add. Found only ${buttons.length} products.`);
    }
  }

  /**
   * Shuffles the list of "Add to cart" buttons to randomize the order.
   * 
   * @private
   * @param {ElementHandle<Element>[]} buttons - The array of "Add to cart" button elements.
   * @returns {ElementHandle<Element>[]} - The shuffled array of "Add to cart" button elements.
   */
  private shuffleButtons(buttons: ElementHandle<Element>[]): ElementHandle<Element>[] {
    for (let i = buttons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }
    return buttons;
  }

  /**
   * Clicks a specified number of "Add to cart" buttons.
   * 
   * @private
   * @param {ElementHandle<Element>[]} buttons - The array of "Add to cart" button elements.
   * @param {number} numberOfProducts - The number of products to add to the cart.
   */
  private async clickButtons(buttons: ElementHandle<Element>[], numberOfProducts: number): Promise<void> {
    for (let i = 0; i < numberOfProducts; i++) {
      await buttons[i].click();
    }
  }

  /**
   * Gets the count of total items added to the cart.
   * 
   * @returns {Promise<string>} - A promise that resolves to a string representing the count of items in the cart.
   */
  async getCountOfTotalItemsAddedInCart(): Promise<any> {
    return await Wrappers.getContent(this.page, this.shoppingCartBadge);
  }
}

export default InventoryPage;
