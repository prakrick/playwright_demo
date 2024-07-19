import { Page } from 'playwright';
import Wrappers from '../utils/wrappers';

/**
 * CheckoutPage class represents the page for the checkout process.
 * Provides methods to proceed with the checkout, complete the checkout to place an order, and get the success message after placing the order.
 * 
 * @class
 */
class CheckoutPage {
  private page: Page;
  private buttonCheckout = '#checkout';
  private textboxFirstName = "#first-name";
  private textboxLastName = "#last-name";
  private textboxPincode = "#postal-code";
  private buttonContinue = "#continue";
  private buttonFinish = "#finish";
  private labelThankYou = ".complete-header";

  /**
   * Initializes the CheckoutPage instance with the given Playwright page object.
   * 
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Proceeds to the checkout page.
   * 
   * @returns {Promise<CheckoutPage>} - A promise that resolves to the current instance of CheckoutPage for method chaining.
   */
  async proceedToCheckout(): Promise<CheckoutPage> {
    await Wrappers.click(this.page, this.buttonCheckout);
    return this;
  }

  /**
   * Completes the checkout process to place the order.
   * 
   * @returns {Promise<CheckoutPage>} - A promise that resolves to the current instance of CheckoutPage for method chaining.
   */
  async completeCheckoutToPlaceOrder(): Promise<CheckoutPage> {
    await this.fillPersonalInformationAndProceed();
    await Wrappers.click(this.page, this.buttonFinish);
    return this;
  }

  /**
   * Fills in the personal information and proceeds to the next step in the checkout process.
   * 
   * @private
   */
  private async fillPersonalInformationAndProceed(): Promise<void> {
    await Wrappers.fill(this.page, this.textboxFirstName, "Prakash");
    await Wrappers.fill(this.page, this.textboxLastName, "Gupta");
    await Wrappers.fill(this.page, this.textboxPincode, "412207");
    await Wrappers.click(this.page, this.buttonContinue);
  }

  /**
   * Gets the success message displayed after placing the order.
   * 
   * @returns {Promise<string>} - A promise that resolves to a string representing the success message.
   */
  async getSuccessMessage(): Promise<any> {
    return await Wrappers.getContent(this.page, this.labelThankYou);
  }
}

export default CheckoutPage;
