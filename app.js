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

// Function to display products in batches
function displayProductsInBatches(products, batchSize) {
    const productGrid = document.querySelector('.product-grid');
    const loadMoreButton = document.getElementById('loadMore');
    let startIndex = 0;

    function displayBatch() {
        const endIndex = startIndex + batchSize;
        for (let i = startIndex; i < endIndex && i < products.length; i++) {
            const product = products[i];
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        }

        startIndex = endIndex;

        if (startIndex >= products.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    displayBatch();

    loadMoreButton.addEventListener('click', displayBatch);
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'bg-gray-800', 'p-4', 'rounded-lg');
    
    const title = product["Lucas Spreadsheet"];
    const price = product["Column3"];
    const link = product["Column4"];

    const titleElement = document.createElement('h3');
    titleElement.classList.add('text-xl', 'text-green-500', 'mb-2');
    titleElement.textContent = title;

    const priceElement = document.createElement('p');
    priceElement.classList.add('text-gray-400', 'mb-2');
    priceElement.textContent = `Price: ${price}`;

    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    linkElement.textContent = 'Product Link';

    productCard.appendChild(titleElement);
    productCard.appendChild(priceElement);
    productCard.appendChild(linkElement);

    return productCard;
}

// Function to filter products based on search terms
function filterProducts(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
        const title = product["Lucas Spreadsheet"].toLowerCase();
        return title.includes(searchTerm);
    });
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    displayProductsInBatches(jsonData, 40);

    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const loadMoreButton = document.getElementById('loadMore');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const filteredProducts = filterProducts(jsonData, searchTerm);
        productGrid.innerHTML = '';
        displayProductsInBatches(filteredProducts, 40);
    });

    searchInput.addEventListener('input', () => {
        loadMoreButton.style.display = 'none';
    });
});
