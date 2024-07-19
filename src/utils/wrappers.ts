import { Page } from 'playwright';

/**
 * Wrappers class provides utility methods to interact with Playwright page elements.
 * 
 * @class
 */
class Wrappers {
  /**
   * Clicks on an element specified by the selector.
   * 
   * @param {Page} page - The Playwright page object.
   * @param {string} selector - The CSS selector of the element to click.
   * @returns {Promise<void>} - A promise that resolves when the click action is complete.
   */
  async click(page: Page, selector: string): Promise<void> {
    await page.click(selector);
  }

  /**
   * Fills an input field specified by the selector with the given text.
   * 
   * @param {Page} page - The Playwright page object.
   * @param {string} selector - The CSS selector of the input field.
   * @param {string} text - The text to fill into the input field.
   * @returns {Promise<void>} - A promise that resolves when the fill action is complete.
   */
  async fill(page: Page, selector: string, text: string): Promise<void> {
    await page.fill(selector, text);
  }

  /**
   * Retrieves the text content of an element specified by the selector.
   * 
   * @param {Page} page - The Playwright page object.
   * @param {string} selector - The CSS selector of the element.
   * @returns {Promise<string | null>} - A promise that resolves to the text content of the element, or null if the element is not found.
   */
  async getContent(page: Page, selector: string): Promise<string | null> {
    return await page.textContent(selector);
  }
}

export default new Wrappers();
