import { test as base, chromium, Browser, Page } from '@playwright/test';
import DriverFactory from '../src/utils/driverFactory';

type MyFixtures = {
  browser: Browser;
  page: Page;
};

/**
 * Extends the base Playwright test to include custom fixtures for browser and page.
 * 
 * @type {MyFixtures} - Defines the types for the custom fixtures.
 */
const test = base.extend<MyFixtures>({
  /**
   * Provides a browser instance using the DriverFactory.
   * 
   * @param {} - Unused parameter.
   * @param {function} use - The function to use the browser instance.
   * @returns {Promise<void>} - A promise that resolves when the browser is closed.
   */
  browser: async ({}: any, use: (arg0: Browser) => any) => {
    const browser = await DriverFactory.getDriver('chromium');
    await use(browser);
    await browser.close();
  },
  
  /**
   * Provides a page instance from the browser context.
   * 
   * @param {object} fixtures - The fixtures object containing the browser instance.
   * @param {function} use - The function to use the page instance.
   * @returns {Promise<void>} - A promise that resolves when the context is closed.
   */
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { test };
