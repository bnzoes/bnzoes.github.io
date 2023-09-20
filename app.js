// Function to fetch products from the JSON file
async function fetchProductsFromJSON() {
    try {
        const response = await fetch('products.json'); // Assuming it's in the root directory
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to display all products in the grid
function displayAllProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'bg-gray-800', 'p-4', 'rounded-lg');
        productCard.dataset.productId = index;

        // Loop through all properties and display them
        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                const value = product[key];
                const keyValueElement = document.createElement('p');
                keyValueElement.classList.add('text-gray-400');
                keyValueElement.innerHTML = `<strong>${key}:</strong> ${value}`;
                productCard.appendChild(keyValueElement);
            }
        }

        productGrid.appendChild(productCard);
    });
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    displayAllProducts(jsonData);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        searchProducts(searchInput.value);
    });
});
