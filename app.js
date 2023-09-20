// Global variables for pagination and products per page
let currentPage = 1;
const productsPerPage = 20;
let filteredProducts = [];

// Function to paginate and display products
function displayProducts(page) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    }
}

// Function to handle search
function handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();

    filteredProducts = jsonData.filter((product) => {
        const title = product["Lucas Spreadsheet"].toLowerCase();
        return title.includes(searchTerm);
    });
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    filteredProducts = jsonData;

    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        handleSearch(searchTerm);
        currentPage = 1;
        displayProducts(currentPage);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        handleSearch(searchTerm);
        currentPage = 1;
        displayProducts(currentPage);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            displayProducts(currentPage);
        }
    });

    displayProducts(currentPage);
});

