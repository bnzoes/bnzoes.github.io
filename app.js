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

// Function to display products in the grid
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    // Filter products that have "Lucas Spreadsheet" property
    const productsArray = products.filter(product => product["Lucas Spreadsheet"]);

    productsArray.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'bg-gray-800', 'p-4', 'rounded-lg', 'cursor-pointer');
        productCard.dataset.productId = index;

        productCard.innerHTML = `
            <h3 class="text-xl text-green-500">${product["Lucas Spreadsheet"]}</h3>
            <p class="text-gray-400">Price: ${product["Column3"] || "N/A"}</p>
            <a href="${product["Column4"] || "#"}" target="_blank" class="text-blue-500 hover:underline">Product Link</a>
        `;

        productCard.addEventListener('click', () => {
            displayProductPopup(product);
        });

        productGrid.appendChild(productCard);
    });
}

// Function to display product popup
function displayProductPopup(product) {
    const productPopup = document.getElementById('product-popup');
    productPopup.innerHTML = `
        <h2 class="text-2xl text-white">${product["Lucas Spreadsheet"]}</h2>
        <p class="text-gray-400">Price: ${product["Column3"] || "N/A"}</p>
        <a href="${product["Column4"] || "#"}" target="_blank" class="text-blue-500 hover:underline">Product Link</a>
    `;
    productPopup.style.display = 'block';
}

// Function to handle search functionality
function searchProducts(query) {
    const filteredProducts = products.filter((product) =>
        product["Lucas Spreadsheet"].toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    products = jsonData; // Store the JSON data globally
    displayProducts(jsonData);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        searchProducts(searchInput.value);
    });
});
