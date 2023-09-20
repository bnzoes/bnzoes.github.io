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

// Function to display selected properties of all products in the grid
function displaySelectedProperties(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'bg-gray-800', 'p-4', 'rounded-lg');
        productCard.dataset.productId = index;

        // Display specific properties if they exist
        const lucasSpreadsheet = product["Lucas Spreadsheet"];
        const column3 = product["Column3"];
        const column4 = product["Column4"];

        if (lucasSpreadsheet && column3 && column4) {
            const titleElement = document.createElement('h3');
            titleElement.classList.add('text-xl', 'text-green-500');
            titleElement.textContent = lucasSpreadsheet;

            const priceElement = document.createElement('p');
            priceElement.classList.add('text-gray-400');
            priceElement.textContent = `Price: ${column3}`;

            const linkElement = document.createElement('a');
            linkElement.href = column4;
            linkElement.target = '_blank';
            linkElement.textContent = 'Product Link';

            productCard.appendChild(titleElement);
            productCard.appendChild(priceElement);
            productCard.appendChild(linkElement);

            productGrid.appendChild(productCard);
        }
    });
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    displaySelectedProperties(jsonData);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        searchProducts(searchInput.value);
    });
});
