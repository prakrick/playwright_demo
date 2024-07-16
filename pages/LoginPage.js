
/**
 * LoginPage class represents the login page of the application.
 * @class
 */
class LoginPage{
    
    
    // Elements
    /**
     * Initializes the LoginPage instance with page elements.
     *
     * @param {Object} page - The Playwright page object.
     */
    constructor(page){
        this.page = page
        this.textbox_username = page.locator('[data-test="username"]');
        this.textbox_password = page.locator('[data-test="password"]');
        this.button_login = page.locator('[data-test="login-button"]');
        this.loginCredentials = require('../resources/test-data/login_credentials.json');
    }

    // Operations/Methods
    /**
     * Logs into the application with the provided username and password.
     * @param {string} username - The username to use for login.
     * @param {string} password - The password to use for login.
     */
    async loginToApplication(username, password){
        await this.textbox_username.fill(username);
        await this.textbox_password.fill(password);
        await this.button_login.click()
    }


    /**
     * Logs into the application with valid credentials.
     */
    async loginToApplicationWithValidCredentials(){

        // Loading login credentials from JSON file
        // const loginCredentials = require('../resources/test-data/login_credentials.json');  

        // Extracting credentials for valid case
        const {valid_username, valid_password} = this.loginCredentials.data.valid_credential;
  
        await this.loginToApplication(valid_username, valid_password)
      
    }

}

/**
 * Exports the LoginPage class as the default export of this module.
 * @module LoginPage
 */
export default LoginPage;
