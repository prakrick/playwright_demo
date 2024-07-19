import { Page } from 'playwright';
import Wrappers from '../utils/wrappers';

/**
 * LoginPage class represents the login page of the application.
 * Provides methods to log into the application using provided or valid credentials.
 * 
 * @class
 */
class LoginPage {
  private page: Page;
  private textboxUsername = '#user-name';
  private textboxPassword = '#password';
  private buttonLogin = '#login-button';
  private loginCredentials = require('../../resources/test-data/login_credentials.json');

  /**
   * Initializes the LoginPage instance with the given Playwright page object.
   * 
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Logs into the application with the provided username and password.
   * 
   * @param {string} username - The username to use for login.
   * @param {string} password - The password to use for login.
   * @returns {Promise<void>} - A promise that resolves when the login action is complete.
   */
  async loginToApplication(username: string, password: string): Promise<void> {
    await Wrappers.fill(this.page, this.textboxUsername, username);
    await Wrappers.fill(this.page, this.textboxPassword, password);
    await Wrappers.click(this.page, this.buttonLogin);
  }

  /**
   * Logs into the application with valid credentials loaded from a JSON file.
   * 
   * @returns {Promise<void>} - A promise that resolves when the login action with valid credentials is complete.
   */
  async loginToApplicationWithValidCredentials(): Promise<void> {
    // Extracting credentials for valid case
    const { valid_username, valid_password } = this.loginCredentials.data.valid_credential;
    await this.loginToApplication(valid_username, valid_password);
  }
}

export default LoginPage;
