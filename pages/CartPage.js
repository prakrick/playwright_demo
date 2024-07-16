/**
 * CartPage class represents the page displaying a list of products.
 * @class
 */
 class CartPage{
    
    // Elements
     /**
     * Initializes the HeaderPage instance with page elements.
     *
     * @param {Object} page - The Playwright page object.
     */
    constructor(page){
        this.page = page
        this.checkout_button = page.locator('#checkout')
    }
}

/**
 * Exports the CartPage class as the default export of this module.
 * @module CartPage
 */
export default CartPage;
