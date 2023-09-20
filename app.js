// Function to display all products
function displayAllProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach((product) => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    displayAllProducts(jsonData);
});

