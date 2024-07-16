/**
 * HeaderPage class represents the page displaying a list of products.
 * @class
 */
 class HeaderPage{
    
    // Elements
     /**
     * Initializes the HeaderPage instance with page elements.
     *
     * @param {Object} page - The Playwright page object.
     */
    constructor(page){
        this.page = page
        this.header_icon_cart = page.locator('#shopping_cart_container')
    }

    async clickOnCartIcon(productName){
        const addToCartButton = `//div[text()='${productName}']/../../following-sibling::div/button`
        await this.page.locator(addToCartButton).click()
    }

}

/**
 * Exports the HeaderPage class as the default export of this module.
 * @module HeaderPage
 */
export default HeaderPage;