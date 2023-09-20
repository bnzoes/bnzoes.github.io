// Global variables for pagination
let currentPage = 1;
const productsPerPage = 40;

// Function to paginate and display products
function displayProducts(products, page) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    }
}

// Function to handle search
function handleSearch(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();

    const filteredProducts = products.filter((product) => {
        const title = product["Lucas Spreadsheet"].toLowerCase();
        return title.includes(searchTerm);
    });

    return filteredProducts;
}

// Event listener to load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchProductsFromJSON();
    let filteredProducts = jsonData;

    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        filteredProducts = handleSearch(jsonData, searchTerm);
        currentPage = 1;
        displayProducts(filteredProducts, currentPage);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        filteredProducts = handleSearch(jsonData, searchTerm);
        currentPage = 1;
        displayProducts(filteredProducts, currentPage);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(filteredProducts, currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            displayProducts(filteredProducts, currentPage);
        }
    });

    displayProducts(filteredProducts, currentPage);
});

