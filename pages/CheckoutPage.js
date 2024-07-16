/**
 * CheckoutPage class represents the page displaying a list of products.
 * @class
 */
 class CheckoutPage{
    
    // Elements
     /**
     * Initializes the CheckoutPage instance with page elements.
     *
     * @param {Object} page - The Playwright page object.
     */
    constructor(page){
        this.page = page
        this.title_checkout_your_information = page.locator("//span[text()='Checkout: Your Information']")
        this.textbox_first_name = page.locator('#first-name')
        this.textbox_last_name = page.locator('#last-name')
        this.textbox_postal_code = page.locator('#postal-code')
        this.button_continue = page.locator('#continue')
        this.title_checkout_overview = page.locator('//span[text()="Checkout: Overview"]')
        this.inventory_item_name = page.locator(".inventory_item_name")
        this.inventory_item_price = page.locator(".inventory_item_price")
        this.cart_quantity = page.locator(".cart_quantity")
        this.button_finish = page.getByRole('button', {name: 'finish'})
        this.success_message = page.locator('.complete-header')
        this.back_home = page.locator('#back-to-products')
    }

    async fillCheckoutInformation(){
        await this.textbox_first_name.fill("Prakash")
        await this.textbox_last_name.fill("Gupta")
        await this.textbox_postal_code.fill("412207")
        await this.button_continue.click()
    }

}

/**
 * Exports the CheckoutPage class as the default export of this module.
 * @module CheckoutPage
 */
export default CheckoutPage;
