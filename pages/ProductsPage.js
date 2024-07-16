/**
 * ProductsPage class represents the page displaying a list of products.
 * @class
 */
 class ProductsPage{
    
    // Elements
     /**
     * Initializes the ProductsPage instance with page elements.
     *
     * @param {Object} page - The Playwright page object.
     */
    constructor(page){
        this.page = page
        this.heading_products = page.locator('.title')
        this.side_panel_icon_expand = page.locator('#react-burger-menu-btn')
    }

    async addProductToCart(productName){
        const addToCartButton = `//div[text()='${productName}']/../../following-sibling::div/button`
        await this.page.locator(addToCartButton).click()
    }

    async getItemPrice(productName){
        const itemPriceLabel = `//div[text()='${productName}']/../../following-sibling::div/div[@class='inventory_item_price']`
        return await this.page.locator(itemPriceLabel).textContent();
    }

}

/**
 * Exports the ProductsPage class as the default export of this module.
 * @module ProductsPage
 */
export default ProductsPage;
