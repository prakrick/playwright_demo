import { chromium, firefox, webkit, Browser } from 'playwright';

/**
 * DriverFactory class provides a method to launch different browser instances based on the browser name provided.
 * 
 * @class
 */
class DriverFactory {
  /**
   * Launches a browser instance based on the provided browser name.
   * 
   * @param {string} browserName - The name of the browser to launch (chromium, firefox, or webkit).
   * @returns {Promise<Browser>} - A promise that resolves to the launched browser instance.
   * @throws {Error} - Throws an error if the browser name is unsupported.
   */
  async getDriver(browserName: string): Promise<Browser> {
    switch (browserName.toLowerCase()) {
      case 'chromium':
        return await chromium.launch();
      case 'firefox':
        return await firefox.launch();
      case 'webkit':
        return await webkit.launch();
      default:
        throw new Error('Unsupported browser!');
    }
  }
}

export default new DriverFactory();
